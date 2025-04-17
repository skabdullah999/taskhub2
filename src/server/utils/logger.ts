import winston from "winston"
import "winston-daily-rotate-file"

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
)

// Create file transports
const fileTransport = new winston.transports.DailyRotateFile({
  filename: "logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  level: "info",
})

const errorFileTransport = new winston.transports.DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  level: "error",
})

// Create console transport with different format for development
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} ${level}: ${typeof message === "object" ? JSON.stringify(message) : message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ""
      }`
    }),
  ),
})

// Create logger
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: logFormat,
  defaultMeta: { service: "taskhub-api" },
  transports: [fileTransport, errorFileTransport, consoleTransport],
  exceptionHandlers: [new winston.transports.File({ filename: "logs/exceptions.log" })],
  rejectionHandlers: [new winston.transports.File({ filename: "logs/rejections.log" })],
})

// If we're not in production, log to the console with pretty format
if (process.env.NODE_ENV !== "production") {
  logger.add(consoleTransport)
}
