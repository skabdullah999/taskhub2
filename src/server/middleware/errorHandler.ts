import type { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError"
import { logger } from "../utils/logger"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userId: req.user?.id,
  })

  // Handle specific error types
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    })
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.message,
    })
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    })
  }

  // Handle database errors
  if (err.name === "DatabaseError") {
    return res.status(500).json({
      success: false,
      message: "Database error occurred",
    })
  }

  // Default to 500 server error
  return res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message || "Internal Server Error",
  })
}

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.path}`,
  })
}
