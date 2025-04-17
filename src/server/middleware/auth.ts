import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { db } from "../db/connection"
import { ApiError } from "../utils/ApiError"

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        userType: string
      }
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authentication required")
    }

    const token = authHeader.split(" ")[1]
    if (!token) {
      throw new ApiError(401, "Authentication token missing")
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string
      email: string
      userType: string
    }

    // Check if user exists
    const user = await db
      .selectFrom("users")
      .select(["id", "email", "user_type", "is_verified"])
      .where("id", "=", decoded.id)
      .executeTakeFirst()

    if (!user) {
      throw new ApiError(401, "User not found")
    }

    if (!user.is_verified) {
      throw new ApiError(403, "Email not verified")
    }

    // Add user to request object
    req.user = {
      id: user.id,
      email: user.email,
      userType: user.user_type,
    }

    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, "Invalid token"))
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new ApiError(401, "Token expired"))
    }
    next(error)
  }
}

// Middleware to check if user is an advertiser
export const isAdvertiser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.userType !== "advertiser") {
    return next(new ApiError(403, "Access denied. Advertiser role required"))
  }
  next()
}

// Middleware to check if user is a worker
export const isWorker = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.userType !== "worker") {
    return next(new ApiError(403, "Access denied. Worker role required"))
  }
  next()
}

// Middleware to check if user is an admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.userType !== "admin") {
    return next(new ApiError(403, "Access denied. Admin role required"))
  }
  next()
}

// Middleware to check if user is either an advertiser or admin
export const isAdvertiserOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || (req.user.userType !== "advertiser" && req.user.userType !== "admin")) {
    return next(new ApiError(403, "Access denied. Advertiser or admin role required"))
  }
  next()
}

// Middleware to check if user is either a worker or admin
export const isWorkerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || (req.user.userType !== "worker" && req.user.userType !== "admin")) {
    return next(new ApiError(403, "Access denied. Worker or admin role required"))
  }
  next()
}
