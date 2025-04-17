export class ApiError extends Error {
  statusCode: number
  errors: any[]

  constructor(statusCode: number, message: string, errors: any[] = []) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors

    // Set prototype explicitly for better error handling
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}
