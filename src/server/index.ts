import express from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import rateLimit from "express-rate-limit"
import { createServer } from "http"
import { Server } from "socket.io"
import dotenv from "dotenv"
import { errorHandler } from "./middleware/errorHandler"
import { notFoundHandler } from "./middleware/notFoundHandler"
import { requestLogger } from "./middleware/requestLogger"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import jobRoutes from "./routes/job.routes"
import taskRoutes from "./routes/task.routes"
import walletRoutes from "./routes/wallet.routes"
import messageRoutes from "./routes/message.routes"
import adRoutes from "./routes/ad.routes"
import { initializeSocketIO } from "./socket"
import { connectToDatabase } from "./db/connection"

dotenv.config()

// Initialize express app
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

// Initialize socket.io
initializeSocketIO(io)

// Connect to database
connectToDatabase()

// Apply middlewares
app.use(helmet()) // Security headers
app.use(compression()) // Compress responses
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

// Request logging
app.use(requestLogger)

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() })
})

// API routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/wallet", walletRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/ads", adRoutes)

// Error handling
app.use(notFoundHandler)
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export { app, httpServer }
