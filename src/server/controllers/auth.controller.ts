import type { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { db } from "../db/connection"
import { ApiError } from "../utils/ApiError"
import { sendEmail } from "../utils/email"
import type { NewUser } from "../db/types"

// Register a new user
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, fullName, userType } = req.body

  try {
    // Check if user already exists
    const existingUser = await db.selectFrom("users").select("id").where("email", "=", email).executeTakeFirst()

    if (existingUser) {
      throw new ApiError(409, "User with this email already exists")
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex")

    // Create user
    const newUser: NewUser = {
      email,
      password_hash: hashedPassword,
      full_name: fullName,
      user_type: userType as "worker" | "advertiser" | "admin",
      verification_token: verificationToken,
    }

    // Insert user into database
    const result = await db.transaction().execute(async (trx) => {
      // Insert user
      const user = await trx
        .insertInto("users")
        .values(newUser)
        .returning(["id", "email", "full_name", "user_type"])
        .executeTakeFirstOrThrow()

      // Create wallet for user
      await trx
        .insertInto("wallets")
        .values({
          user_id: user.id,
        })
        .execute()

      return user
    })

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`
    await sendEmail({
      to: email,
      subject: "Verify your email address",
      text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
      html: `
        <h1>Email Verification</h1>
        <p>Hi ${fullName},</p>
        <p>Thank you for registering with TaskHub. Please verify your email by clicking the button below:</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>If the button doesn't work, you can also click on this link: <a href="${verificationUrl}">${verificationUrl}</a></p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>TaskHub Team</p>
      `,
    })

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please check your email to verify your account.",
      data: {
        id: result.id,
        email: result.email,
        fullName: result.full_name,
        userType: result.user_type,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Login user
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  try {
    // Find user by email
    const user = await db
      .selectFrom("users")
      .select(["id", "email", "password_hash", "full_name", "user_type", "is_verified"])
      .where("email", "=", email)
      .executeTakeFirst()

    if (!user) {
      throw new ApiError(401, "Invalid credentials")
    }

    // Check if user is verified
    if (!user.is_verified) {
      throw new ApiError(403, "Please verify your email before logging in")
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials")
    }

    // Generate JWT tokens
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        userType: user.user_type,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" },
    )

    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "7d" })

    // Update last login time
    await db.updateTable("users").set({ last_login: new Date() }).where("id", "=", user.id).execute()

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          userType: user.user_type,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

// Verify email
export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params

  try {
    // Find user by verification token
    const user = await db
      .selectFrom("users")
      .select(["id", "verification_token"])
      .where("verification_token", "=", token)
      .executeTakeFirst()

    if (!user) {
      throw new ApiError(400, "Invalid or expired verification token")
    }

    // Update user to verified
    await db
      .updateTable("users")
      .set({
        is_verified: true,
        verification_token: null,
      })
      .where("id", "=", user.id)
      .execute()

    res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    })
  } catch (error) {
    next(error)
  }
}

// Forgot password
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body

  try {
    // Find user by email
    const user = await db
      .selectFrom("users")
      .select(["id", "email", "full_name"])
      .where("email", "=", email)
      .executeTakeFirst()

    if (!user) {
      // Don't reveal that the user doesn't exist
      return res.status(200).json({
        success: true,
        message: "If your email is registered, you will receive a password reset link",
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpires = new Date(Date.now() + 3600000) // 1 hour

    // Save reset token to database
    await db
      .updateTable("users")
      .set({
        reset_token: resetToken,
        reset_token_expires: resetTokenExpires,
      })
      .where("id", "=", user.id)
      .execute()

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Please click on the following link to reset your password: ${resetUrl}. This link will expire in 1 hour.`,
      html: `
        <h1>Password Reset</h1>
        <p>Hi ${user.full_name},</p>
        <p>You requested a password reset. Please click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If the button doesn't work, you can also click on this link: <a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>TaskHub Team</p>
      `,
    })

    res.status(200).json({
      success: true,
      message: "If your email is registered, you will receive a password reset link",
    })
  } catch (error) {
    next(error)
  }
}

// Reset password
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params
  const { password } = req.body

  try {
    // Find user by reset token
    const user = await db
      .selectFrom("users")
      .select(["id", "reset_token", "reset_token_expires"])
      .where("reset_token", "=", token)
      .executeTakeFirst()

    if (!user) {
      throw new ApiError(400, "Invalid or expired reset token")
    }

    // Check if token is expired
    if (!user.reset_token_expires || new Date() > user.reset_token_expires) {
      throw new ApiError(400, "Reset token has expired")
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Update user password
    await db
      .updateTable("users")
      .set({
        password_hash: hashedPassword,
        reset_token: null,
        reset_token_expires: null,
      })
      .where("id", "=", user.id)
      .execute()

    res.status(200).json({
      success: true,
      message: "Password reset successful. You can now log in with your new password.",
    })
  } catch (error) {
    next(error)
  }
}

// Refresh token
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return next(new ApiError(401, "Refresh token not found"))
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as { id: string }

    // Find user
    const user = await db
      .selectFrom("users")
      .select(["id", "email", "user_type"])
      .where("id", "=", decoded.id)
      .executeTakeFirst()

    if (!user) {
      throw new ApiError(401, "Invalid refresh token")
    }

    // Generate new access token
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        userType: user.user_type,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" },
    )

    res.status(200).json({
      success: true,
      data: {
        accessToken,
      },
    })
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, "Invalid refresh token"))
    }
    next(error)
  }
}

// Logout
export const logout = (req: Request, res: Response) => {
  // Clear refresh token cookie
  res.clearCookie("refreshToken")

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  })
}
