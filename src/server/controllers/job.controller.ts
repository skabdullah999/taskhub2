import type { Request, Response, NextFunction } from "express"
import { db } from "../db/connection"
import { ApiError } from "../utils/ApiError"

// Create a new job
export const createJob = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    description,
    instructions,
    categoryId,
    paymentPerTask,
    maxWorkers,
    proofRequired,
    difficulty,
    estimatedTime,
    expiresAt,
  } = req.body

  try {
    // Check if user has enough balance
    const wallet = await db
      .selectFrom("wallets")
      .select("balance")
      .where("user_id", "=", req.user!.id)
      .executeTakeFirst()

    if (!wallet) {
      throw new ApiError(404, "Wallet not found")
    }

    const totalCost = paymentPerTask * maxWorkers
    const serviceFee = totalCost * 0.05 // 5% service fee
    const totalAmount = totalCost + serviceFee

    if (wallet.balance < totalAmount) {
      throw new ApiError(400, "Insufficient balance to create this job")
    }

    // Create job
    const result = await db.transaction().execute(async (trx) => {
      // Insert job
      const job = await trx
        .insertInto("jobs")
        .values({
          advertiser_id: req.user!.id,
          category_id: categoryId,
          title,
          description,
          instructions,
          payment_per_task: paymentPerTask,
          max_workers: maxWorkers,
          remaining_spots: maxWorkers,
          proof_required: proofRequired,
          difficulty,
          estimated_time: estimatedTime,
          expires_at: expiresAt ? new Date(expiresAt) : null,
        })
        .returning([
          "id",
          "title",
          "description",
          "payment_per_task",
          "max_workers",
          "remaining_spots",
          "status",
          "created_at",
        ])
        .executeTakeFirstOrThrow()

      // Deduct amount from wallet
      await trx
        .updateTable("wallets")
        .set({
          balance: db.fn.subtract("balance", totalAmount),
          updated_at: new Date(),
        })
        .where("user_id", "=", req.user!.id)
        .execute()

      // Record transaction
      await trx
        .insertInto("transactions")
        .values({
          user_id: req.user!.id,
          amount: totalAmount,
          type: "task_payment",
          status: "completed",
          description: `Payment for job: ${title} (${maxWorkers} tasks at $${paymentPerTask} each + $${serviceFee} service fee)`,
          job_id: job.id,
        })
        .execute()

      return job
    })

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// Get all jobs with filtering
export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      category,
      difficulty,
      minPayment,
      maxPayment,
      status = "active",
      sortBy = "newest",
      page = 1,
      limit = 10,
    } = req.query

    // Build query
    let query = db
      .selectFrom("jobs")
      .innerJoin("users", "jobs.advertiser_id", "users.id")
      .innerJoin("categories", "jobs.category_id", "categories.id")
      .select([
        "jobs.id",
        "jobs.title",
        "jobs.description",
        "jobs.payment_per_task",
        "jobs.max_workers",
        "jobs.remaining_spots",
        "jobs.difficulty",
        "jobs.estimated_time",
        "jobs.status",
        "jobs.created_at",
        "users.full_name as advertiser_name",
        "categories.name as category_name",
        "categories.icon as category_icon",
      ])

    // Apply filters
    if (category) {
      query = query.where("jobs.category_id", "=", category as string)
    }

    if (difficulty) {
      query = query.where("jobs.difficulty", "=", difficulty as string)
    }

    if (minPayment) {
      query = query.where("jobs.payment_per_task", ">=", Number(minPayment))
    }

    if (maxPayment) {
      query = query.where("jobs.payment_per_task", "<=", Number(maxPayment))
    }

    if (status) {
      query = query.where("jobs.status", "=", status as string)
    }

    // Count total results for pagination
    const countQuery = query.clone().clearSelect().select(db.fn.countAll().as("count"))
    const { count } = await countQuery.executeTakeFirstOrThrow()

    // Apply sorting
    switch (sortBy) {
      case "oldest":
        query = query.orderBy("jobs.created_at", "asc")
        break
      case "payment_high":
        query = query.orderBy("jobs.payment_per_task", "desc")
        break
      case "payment_low":
        query = query.orderBy("jobs.payment_per_task", "asc")
        break
      case "newest":
      default:
        query = query.orderBy("jobs.created_at", "desc")
        break
    }

    // Apply pagination
    const offset = (Number(page) - 1) * Number(limit)
    query = query.limit(Number(limit)).offset(offset)

    // Execute query
    const jobs = await query.execute()

    res.status(200).json({
      success: true,
      data: {
        jobs,
        pagination: {
          total: Number(count),
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(Number(count) / Number(limit)),
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

// Get job by ID
export const getJobById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    // Get job details
    const job = await db
      .selectFrom("jobs")
      .innerJoin("users", "jobs.advertiser_id", "users.id")
      .innerJoin("categories", "jobs.category_id", "categories.id")
      .select([
        "jobs.id",
        "jobs.title",
        "jobs.description",
        "jobs.instructions",
        "jobs.payment_per_task",
        "jobs.max_workers",
        "jobs.remaining_spots",
        "jobs.proof_required",
        "jobs.difficulty",
        "jobs.estimated_time",
        "jobs.status",
        "jobs.created_at",
        "jobs.expires_at",
        "users.id as advertiser_id",
        "users.full_name as advertiser_name",
        "categories.id as category_id",
        "categories.name as category_name",
        "categories.icon as category_icon",
      ])
      .where("jobs.id", "=", id)
      .executeTakeFirst()

    if (!job) {
      throw new ApiError(404, "Job not found")
    }

    // Check if user has already applied for this job
    let userTask = null
    if (req.user) {
      userTask = await db
        .selectFrom("tasks")
        .select(["id", "status", "created_at"])
        .where("job_id", "=", id)
        .where("worker_id", "=", req.user.id)
        .executeTakeFirst()
    }

    res.status(200).json({
      success: true,
      data: {
        ...job,
        userTask,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Update job
export const updateJob = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const {
    title,
    description,
    instructions,
    categoryId,
    paymentPerTask,
    maxWorkers,
    proofRequired,
    difficulty,
    estimatedTime,
    status,
    expiresAt,
  } = req.body

  try {
    // Check if job exists and belongs to the user
    const job = await db
      .selectFrom("jobs")
      .select(["id", "advertiser_id", "max_workers", "remaining_spots"])
      .where("id", "=", id)
      .executeTakeFirst()

    if (!job) {
      throw new ApiError(404, "Job not found")
    }

    // Check if user is the job owner or admin
    if (job.advertiser_id !== req.user!.id && req.user!.userType !== "admin") {
      throw new ApiError(403, "You are not authorized to update this job")
    }

    // Prepare update data
    const updateData: Record<string, any> = {
      updated_at: new Date(),
    }

    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (instructions !== undefined) updateData.instructions = instructions
    if (categoryId !== undefined) updateData.category_id = categoryId
    if (proofRequired !== undefined) updateData.proof_required = proofRequired
    if (difficulty !== undefined) updateData.difficulty = difficulty
    if (estimatedTime !== undefined) updateData.estimated_time = estimatedTime
    if (status !== undefined) updateData.status = status
    if (expiresAt !== undefined) updateData.expires_at = expiresAt ? new Date(expiresAt) : null

    // Handle special case for maxWorkers and paymentPerTask
    if (maxWorkers !== undefined && maxWorkers !== job.max_workers) {
      // Calculate how many new spots are being added
      const spotsAdded = maxWorkers - job.max_workers

      if (spotsAdded > 0) {
        // Check if user has enough balance for additional spots
        const wallet = await db
          .selectFrom("wallets")
          .select("balance")
          .where("user_id", "=", req.user!.id)
          .executeTakeFirst()

        if (!wallet) {
          throw new ApiError(404, "Wallet not found")
        }

        const additionalCost = (paymentPerTask || 0) * spotsAdded
        const serviceFee = additionalCost * 0.05 // 5% service fee
        const totalAmount = additionalCost + serviceFee

        if (wallet.balance < totalAmount) {
          throw new ApiError(400, "Insufficient balance to add more worker spots")
        }

        // Update wallet and create transaction in the transaction below
        updateData.max_workers = maxWorkers
        updateData.remaining_spots = job.remaining_spots + spotsAdded
      } else {
        // Reducing max workers is only allowed if no tasks have been assigned yet
        const assignedTasks = await db
          .selectFrom("tasks")
          .select(db.fn.countAll().as("count"))
          .where("job_id", "=", id)
          .executeTakeFirst()

        if (Number(assignedTasks?.count) > 0) {
          throw new ApiError(400, "Cannot reduce maximum workers after tasks have been assigned")
        }

        updateData.max_workers = maxWorkers
        updateData.remaining_spots = maxWorkers
      }
    }

    // Update job
    const result = await db.transaction().execute(async (trx) => {
      // Update job
      const updatedJob = await trx
        .updateTable("jobs")
        .set(updateData)
        .where("id", "=", id)
        .returning([
          "id",
          "title",
          "description",
          "payment_per_task",
          "max_workers",
          "remaining_spots",
          "status",
          "updated_at",
        ])
        .executeTakeFirstOrThrow()

      // Handle payment for additional spots if needed
      if (maxWorkers !== undefined && maxWorkers > job.max_workers) {
        const spotsAdded = maxWorkers - job.max_workers
        const additionalCost = (paymentPerTask || 0) * spotsAdded
        const serviceFee = additionalCost * 0.05 // 5% service fee
        const totalAmount = additionalCost + serviceFee

        // Deduct amount from wallet
        await trx
          .updateTable("wallets")
          .set({
            balance: db.fn.subtract("balance", totalAmount),
            updated_at: new Date(),
          })
          .where("user_id", "=", req.user!.id)
          .execute()

        // Record transaction
        await trx
          .insertInto("transactions")
          .values({
            user_id: req.user!.id,
            amount: totalAmount,
            type: "task_payment",
            status: "completed",
            description: `Payment for additional ${spotsAdded} worker spots for job: ${updatedJob.title} at $${paymentPerTask} each + $${serviceFee} service fee`,
            job_id: id,
          })
          .execute()
      }

      return updatedJob
    })

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// Delete job
export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    // Check if job exists and belongs to the user
    const job = await db
      .selectFrom("jobs")
      .select(["id", "advertiser_id", "status"])
      .where("id", "=", id)
      .executeTakeFirst()

    if (!job) {
      throw new ApiError(404, "Job not found")
    }

    // Check if user is the job owner or admin
    if (job.advertiser_id !== req.user!.id && req.user!.userType !== "admin") {
      throw new ApiError(403, "You are not authorized to delete this job")
    }

    // Check if job has any completed tasks
    const completedTasks = await db
      .selectFrom("tasks")
      .select(db.fn.countAll().as("count"))
      .where("job_id", "=", id)
      .where("status", "=", "approved")
      .executeTakeFirst()

    if (Number(completedTasks?.count) > 0) {
      throw new ApiError(400, "Cannot delete job with completed tasks")
    }

    // Delete job and refund remaining balance
    await db.transaction().execute(async (trx) => {
      // Get job details for refund calculation
      const jobDetails = await trx
        .selectFrom("jobs")
        .select(["payment_per_task", "remaining_spots"])
        .where("id", "=", id)
        .executeTakeFirst()

      if (!jobDetails) {
        throw new ApiError(404, "Job details not found")
      }

      // Calculate refund amount
      const refundAmount = jobDetails.payment_per_task * jobDetails.remaining_spots
      const serviceFeeRefund = refundAmount * 0.05 // 5% service fee refund
      const totalRefund = refundAmount + serviceFeeRefund

      // Add refund to wallet
      if (totalRefund > 0) {
        await trx
          .updateTable("wallets")
          .set({
            balance: db.fn.add("balance", totalRefund),
            updated_at: new Date(),
          })
          .where("user_id", "=", req.user!.id)
          .execute()

        // Record refund transaction
        await trx
          .insertInto("transactions")
          .values({
            user_id: req.user!.id,
            amount: totalRefund,
            type: "refund",
            status: "completed",
            description: `Refund for deleted job: ${job.id} (${jobDetails.remaining_spots} unused spots)`,
            job_id: id,
          })
          .execute()
      }

      // Delete job
      await trx.deleteFrom("jobs").where("id", "=", id).execute()
    })

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

// Apply for a job
export const applyForJob = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    // Check if job exists and is active
    const job = await db
      .selectFrom("jobs")
      .select(["id", "advertiser_id", "remaining_spots", "status"])
      .where("id", "=", id)
      .where("status", "=", "active")
      .executeTakeFirst()

    if (!job) {
      throw new ApiError(404, "Job not found or not active")
    }

    // Check if user is not the job owner
    if (job.advertiser_id === req.user!.id) {
      throw new ApiError(400, "You cannot apply for your own job")
    }

    // Check if job has remaining spots
    if (job.remaining_spots <= 0) {
      throw new ApiError(400, "No spots remaining for this job")
    }

    // Check if user has already applied for this job
    const existingTask = await db
      .selectFrom("tasks")
      .select("id")
      .where("job_id", "=", id)
      .where("worker_id", "=", req.user!.id)
      .executeTakeFirst()

    if (existingTask) {
      throw new ApiError(400, "You have already applied for this job")
    }

    // Create task and update job
    const result = await db.transaction().execute(async (trx) => {
      // Create task
      const task = await trx
        .insertInto("tasks")
        .values({
          job_id: id,
          worker_id: req.user!.id,
        })
        .returning(["id", "status", "created_at"])
        .executeTakeFirstOrThrow()

      // Update job remaining spots
      await trx
        .updateTable("jobs")
        .set({
          remaining_spots: db.fn.subtract("remaining_spots", 1),
          updated_at: new Date(),
        })
        .where("id", "=", id)
        .execute()

      return task
    })

    res.status(201).json({
      success: true,
      message: "Successfully applied for job",
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// Submit task proof
export const submitTaskProof = async (req: Request, res: Response, next: NextFunction) => {
  const { jobId, taskId } = req.params
  const { proof } = req.body

  try {
    // Check if task exists and belongs to the user
    const task = await db
      .selectFrom("tasks")
      .select(["id", "worker_id", "status"])
      .where("id", "=", taskId)
      .where("job_id", "=", jobId)
      .executeTakeFirst()

    if (!task) {
      throw new ApiError(404, "Task not found")
    }

    if (task.worker_id !== req.user!.id) {
      throw new ApiError(403, "You are not authorized to submit proof for this task")
    }

    if (task.status !== "pending") {
      throw new ApiError(400, `Cannot submit proof for a task with status: ${task.status}`)
    }

    // Update task
    const result = await db
      .updateTable("tasks")
      .set({
        proof,
        status: "submitted",
        submitted_at: new Date(),
        updated_at: new Date(),
      })
      .where("id", "=", taskId)
      .returning(["id", "status", "submitted_at"])
      .executeTakeFirstOrThrow()

    res.status(200).json({
      success: true,
      message: "Task proof submitted successfully",
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// Review task submission
export const reviewTaskSubmission = async (req: Request, res: Response, next: NextFunction) => {
  const { jobId, taskId } = req.params
  const { status, feedback } = req.body

  try {
    // Check if job exists and belongs to the user
    const job = await db
      .selectFrom("jobs")
      .select(["id", "advertiser_id", "payment_per_task"])
      .where("id", "=", jobId)
      .executeTakeFirst()

    if (!job) {
      throw new ApiError(404, "Job not found")
    }

    // Check if user is the job owner or admin
    if (job.advertiser_id !== req.user!.id && req.user!.userType !== "admin") {
      throw new ApiError(403, "You are not authorized to review this task")
    }

    // Check if task exists and is submitted
    const task = await db
      .selectFrom("tasks")
      .select(["id", "worker_id", "status"])
      .where("id", "=", taskId)
      .where("job_id", "=", jobId)
      .where("status", "=", "submitted")
      .executeTakeFirst()

    if (!task) {
      throw new ApiError(404, "Task not found or not submitted")
    }

    // Process task review
    const result = await db.transaction().execute(async (trx) => {
      // Update task
      const updatedTask = await trx
        .updateTable("tasks")
        .set({
          status: status as "approved" | "rejected",
          feedback,
          reviewed_at: new Date(),
          updated_at: new Date(),
        })
        .where("id", "=", taskId)
        .returning(["id", "status", "reviewed_at"])
        .executeTakeFirstOrThrow()

      // If task is approved, pay the worker
      if (status === "approved") {
        // Add payment to worker's wallet
        await trx
          .updateTable("wallets")
          .set({
            balance: db.fn.add("balance", job.payment_per_task),
            updated_at: new Date(),
          })
          .where("user_id", "=", task.worker_id)
          .execute()

        // Record transaction
        await trx
          .insertInto("transactions")
          .values({
            user_id: task.worker_id,
            amount: job.payment_per_task,
            type: "task_payment",
            status: "completed",
            description: `Payment for completed task: ${taskId} from job: ${jobId}`,
            task_id: taskId,
            job_id: jobId,
          })
          .execute()
      }

      return updatedTask
    })

    res.status(200).json({
      success: true,
      message: `Task ${status === "approved" ? "approved" : "rejected"} successfully`,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// Get job applicants
export const getJobApplicants = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { status, page = 1, limit = 10 } = req.query

  try {
    // Check if job exists and belongs to the user
    const job = await db.selectFrom("jobs").select(["id", "advertiser_id"]).where("id", "=", id).executeTakeFirst()

    if (!job) {
      throw new ApiError(404, "Job not found")
    }

    // Check if user is the job owner or admin
    if (job.advertiser_id !== req.user!.id && req.user!.userType !== "admin") {
      throw new ApiError(403, "You are not authorized to view applicants for this job")
    }

    // Build query
    let query = db
      .selectFrom("tasks")
      .innerJoin("users", "tasks.worker_id", "users.id")
      .select([
        "tasks.id",
        "tasks.status",
        "tasks.proof",
        "tasks.feedback",
        "tasks.submitted_at",
        "tasks.reviewed_at",
        "tasks.created_at",
        "users.id as worker_id",
        "users.full_name as worker_name",
        "users.profile_image as worker_profile_image",
      ])
      .where("tasks.job_id", "=", id)

    // Apply status filter
    if (status) {
      query = query.where("tasks.status", "=", status as string)
    }

    // Count total results for pagination
    const countQuery = query.clone().clearSelect().select(db.fn.countAll().as("count"))
    const { count } = await countQuery.executeTakeFirstOrThrow()

    // Apply pagination
    const offset = (Number(page) - 1) * Number(limit)
    query = query.orderBy("tasks.created_at", "desc").limit(Number(limit)).offset(offset)

    // Execute query
    const applicants = await query.execute()

    res.status(200).json({
      success: true,
      data: {
        applicants,
        pagination: {
          total: Number(count),
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(Number(count) / Number(limit)),
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

// Get job statistics
export const getJobStatistics = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    // Check if job exists and belongs to the user
    const job = await db
      .selectFrom("jobs")
      .select(["id", "advertiser_id", "max_workers", "remaining_spots"])
      .where("id", "=", id)
      .executeTakeFirst()

    if (!job) {
      throw new ApiError(404, "Job not found")
    }

    // Check if user is the job owner or admin
    if (job.advertiser_id !== req.user!.id && req.user!.userType !== "admin") {
      throw new ApiError(403, "You are not authorized to view statistics for this job")
    }

    // Get task statistics
    const taskStats = await db
      .selectFrom("tasks")
      .select([
        db.fn.countAll().as("total"),
        db.fn.count("id").filterWhere("status", "=", "pending").as("pending"),
        db.fn.count("id").filterWhere("status", "=", "submitted").as("submitted"),
        db.fn.count("id").filterWhere("status", "=", "approved").as("approved"),
        db.fn.count("id").filterWhere("status", "=", "rejected").as("rejected"),
      ])
      .where("job_id", "=", id)
      .executeTakeFirst()

    // Calculate completion percentage
    const takenSpots = job.max_workers - job.remaining_spots
    const completionPercentage = takenSpots > 0 ? Math.round((Number(taskStats?.approved || 0) / takenSpots) * 100) : 0

    res.status(200).json({
      success: true,
      data: {
        totalSpots: job.max_workers,
        remainingSpots: job.remaining_spots,
        takenSpots,
        taskStats: {
          total: Number(taskStats?.total || 0),
          pending: Number(taskStats?.pending || 0),
          submitted: Number(taskStats?.submitted || 0),
          approved: Number(taskStats?.approved || 0),
          rejected: Number(taskStats?.rejected || 0),
        },
        completionPercentage,
      },
    })
  } catch (error) {
    next(error)
  }
}
