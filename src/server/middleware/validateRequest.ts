import type { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { ApiError } from "../utils/ApiError"

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const extractedErrors: { [key: string]: string }[] = []
    errors.array().forEach((err) => {
      if ("path" in err && "msg" in err) {
        extractedErrors.push({ [err.path]: err.msg })
      }
    })

    return next(new ApiError(400, "Validation Error", extractedErrors))
  }

  next()
}
