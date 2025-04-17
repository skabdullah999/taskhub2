import express from "express"
import { body, param, query } from "express-validator"
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyForJob,
  submitTaskProof,
  reviewTaskSubmission,
  getJobApplicants,
  getJobStatistics,
} from "../controllers/job.controller"
import { authenticate, isAdvertiser, isWorker, isAdvertiserOrAdmin } from "../middleware/auth"
import { validateRequest } from "../middleware/validateRequest"

const router = express.Router()

// Get all jobs with filtering
router.get(
  "/",
  [
    query("category").optional().isUUID().withMessage("Invalid category ID"),
    query("difficulty").optional().isIn(["Easy", "Medium", "Hard"]).withMessage("Invalid difficulty level"),
    query("minPayment").optional().isFloat({ min: 0 }).withMessage("Minimum payment must be a positive number"),
    query("maxPayment").optional().isFloat({ min: 0 }).withMessage("Maximum payment must be a positive number"),
    query("status").optional().isIn(["active", "paused", "completed", "cancelled"]).withMessage("Invalid status"),
    query("sortBy")
      .optional()
      .isIn(["newest", "oldest", "payment_high", "payment_low"])
      .withMessage("Invalid sort option"),
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
  ],
  validateRequest,
  getJobs,
)

// Get job by ID
router.get("/:id", [param("id").isUUID().withMessage("Invalid job ID")], validateRequest, getJobById)

// Create new job
router.post(
  "/",
  authenticate,
  isAdvertiser,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("instructions").notEmpty().withMessage("Instructions are required"),
    body("categoryId").isUUID().withMessage("Valid category ID is required"),
    body("paymentPerTask").isFloat({ min: 0.1 }).withMessage("Payment per task must be at least 0.1"),
    body("maxWorkers").isInt({ min: 1 }).withMessage("Maximum workers must be at least 1"),
    body("proofRequired").notEmpty().withMessage("Proof requirements are required"),
    body("difficulty").isIn(["Easy", "Medium", "Hard"]).withMessage("Invalid difficulty level"),
    body("estimatedTime").optional().notEmpty().withMessage("Estimated time cannot be empty if provided"),
  ],
  validateRequest,
  createJob,
)

// Update job
router.put(
  "/:id",
  authenticate,
  isAdvertiserOrAdmin,
  [
    param("id").isUUID().withMessage("Invalid job ID"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("description").optional().notEmpty().withMessage("Description cannot be empty"),
    body("instructions").optional().notEmpty().withMessage("Instructions cannot be empty"),
    body("categoryId").optional().isUUID().withMessage("Invalid category ID"),
    body("paymentPerTask").optional().isFloat({ min: 0.1 }).withMessage("Payment per task must be at least 0.1"),
    body("maxWorkers").optional().isInt({ min: 1 }).withMessage("Maximum workers must be at least 1"),
    body("proofRequired").optional().notEmpty().withMessage("Proof requirements cannot be empty"),
    body("difficulty").optional().isIn(["Easy", "Medium", "Hard"]).withMessage("Invalid difficulty level"),
    body("status").optional().isIn(["active", "paused", "completed", "cancelled"]).withMessage("Invalid status"),
    body("estimatedTime").optional().notEmpty().withMessage("Estimated time cannot be empty if provided"),
  ],
  validateRequest,
  updateJob,
)

// Delete job
router.delete(
  "/:id",
  authenticate,
  isAdvertiserOrAdmin,
  [param("id").isUUID().withMessage("Invalid job ID")],
  validateRequest,
  deleteJob,
)

// Apply for a job
router.post(
  "/:id/apply",
  authenticate,
  isWorker,
  [param("id").isUUID().withMessage("Invalid job ID")],
  validateRequest,
  applyForJob,
)

// Submit task proof
router.post(
  "/:jobId/tasks/:taskId/submit",
  authenticate,
  isWorker,
  [
    param("jobId").isUUID().withMessage("Invalid job ID"),
    param("taskId").isUUID().withMessage("Invalid task ID"),
    body("proof").notEmpty().withMessage("Proof is required"),
  ],
  validateRequest,
  submitTaskProof,
)

// Review task submission
router.post(
  "/:jobId/tasks/:taskId/review",
  authenticate,
  isAdvertiserOrAdmin,
  [
    param("jobId").isUUID().withMessage("Invalid job ID"),
    param("taskId").isUUID().withMessage("Invalid task ID"),
    body("status").isIn(["approved", "rejected"]).withMessage("Status must be either approved or rejected"),
    body("feedback").optional().notEmpty().withMessage("Feedback cannot be empty if provided"),
  ],
  validateRequest,
  reviewTaskSubmission,
)

// Get job applicants
router.get(
  "/:id/applicants",
  authenticate,
  isAdvertiserOrAdmin,
  [param("id").isUUID().withMessage("Invalid job ID")],
  validateRequest,
  getJobApplicants,
)

// Get job statistics
router.get(
  "/:id/statistics",
  authenticate,
  isAdvertiserOrAdmin,
  [param("id").isUUID().withMessage("Invalid job ID")],
  validateRequest,
  getJobStatistics,
)

export default router
