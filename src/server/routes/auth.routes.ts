import express from "express"
import { body } from "express-validator"
import {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
} from "../controllers/auth.controller"
import { validateRequest } from "../middleware/validateRequest"

const router = express.Router()

// Register new user
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .withMessage(
        "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character",
      ),
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("userType").isIn(["worker", "advertiser"]).withMessage("User type must be either worker or advertiser"),
  ],
  validateRequest,
  register,
)

// Login user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  login,
)

// Verify email
router.get("/verify-email/:token", verifyEmail)

// Forgot password
router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Please provide a valid email")],
  validateRequest,
  forgotPassword,
)

// Reset password
router.post(
  "/reset-password/:token",
  [
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .withMessage(
        "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character",
      ),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match")
      }
      return true
    }),
  ],
  validateRequest,
  resetPassword,
)

// Refresh token
router.post("/refresh-token", refreshToken)

// Logout
router.post("/logout", logout)

export default router
