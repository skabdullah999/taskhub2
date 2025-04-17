import type { Server, Socket } from "socket.io"
import jwt from "jsonwebtoken"
import { db } from "./db/connection"
import { logger } from "./utils/logger"

interface UserSocket {
  userId: string
  socketId: string
}

// Store connected users
const connectedUsers: UserSocket[] = []

export const initializeSocketIO = (io: Server) => {
  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token

      if (!token) {
        return next(new Error("Authentication error: Token missing"))
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
        .select(["id", "is_verified"])
        .where("id", "=", decoded.id)
        .executeTakeFirst()

      if (!user || !user.is_verified) {
        return next(new Error("Authentication error: User not found or not verified"))
      }

      // Attach user data to socket
      socket.data.userId = decoded.id
      socket.data.userType = decoded.userType

      next()
    } catch (error) {
      logger.error("Socket authentication error:", error)
      next(new Error("Authentication error"))
    }
  })

  io.on("connection", (socket: Socket) => {
    const userId = socket.data.userId

    // Add user to connected users
    connectedUsers.push({
      userId,
      socketId: socket.id,
    })

    logger.info(`User connected: ${userId}, Socket ID: ${socket.id}`)

    // Join user to their private room
    socket.join(`user:${userId}`)

    // Handle private messages
    socket.on(
      "private-message",
      async (data: { recipientId: string; content: string; jobId?: string; taskId?: string }) => {
        try {
          const { recipientId, content, jobId, taskId } = data

          // Save message to database
          const message = await db
            .insertInto("messages")
            .values({
              sender_id: userId,
              recipient_id: recipientId,
              content,
              job_id: jobId,
              task_id: taskId,
            })
            .returning(["id", "content", "created_at"])
            .executeTakeFirstOrThrow()

          // Emit message to recipient if online
          io.to(`user:${recipientId}`).emit("private-message", {
            id: message.id,
            senderId: userId,
            content: message.content,
            jobId,
            taskId,
            createdAt: message.created_at,
          })

          // Acknowledge message sent
          socket.emit("message-sent", { messageId: message.id })
        } catch (error) {
          logger.error("Error sending private message:", error)
          socket.emit("message-error", { error: "Failed to send message" })
        }
      },
    )

    // Handle message read status
    socket.on("mark-messages-read", async (data: { messageIds: string[] }) => {
      try {
        const { messageIds } = data

        // Update messages in database
        await db
          .updateTable("messages")
          .set({ is_read: true, updated_at: new Date() })
          .where("id", "in", messageIds)
          .where("recipient_id", "=", userId)
          .execute()

        // Acknowledge messages marked as read
        socket.emit("messages-marked-read", { messageIds })
      } catch (error) {
        logger.error("Error marking messages as read:", error)
        socket.emit("message-error", { error: "Failed to mark messages as read" })
      }
    })

    // Handle typing indicator
    socket.on("typing", (data: { recipientId: string; isTyping: boolean }) => {
      const { recipientId, isTyping } = data

      // Emit typing status to recipient
      io.to(`user:${recipientId}`).emit("user-typing", {
        userId,
        isTyping,
      })
    })

    // Handle disconnect
    socket.on("disconnect", () => {
      // Remove user from connected users
      const index = connectedUsers.findIndex((user) => user.socketId === socket.id)
      if (index !== -1) {
        connectedUsers.splice(index, 1)
      }

      logger.info(`User disconnected: ${userId}, Socket ID: ${socket.id}`)
    })
  })
}

// Helper function to check if user is online
export const isUserOnline = (userId: string): boolean => {
  return connectedUsers.some((user) => user.userId === userId)
}

// Helper function to get user's socket ID
export const getUserSocketId = (userId: string): string | null => {
  const user = connectedUsers.find((user) => user.userId === userId)
  return user ? user.socketId : null
}
