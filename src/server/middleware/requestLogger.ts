import type { Request, Response, NextFunction } from "express"
import { logger } from "../utils/logger"

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Skip logging for health check endpoints
  if (req.path === "/api/health") {
    return next()
  }

  const startTime = Date.now()

  // Log request
  logger.info({
    type: "request",
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    userId: req.user?.id,
  })

  // Log response when finished
  res.on("finish", () => {
    const duration = Date.now() - startTime
    const level = res.statusCode >= 400 ? "warn" : "info"

    logger[level]({
      type: "response",
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userId: req.user?.id,
    })
  })

  next()
}
