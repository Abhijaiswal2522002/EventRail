import { NextResponse } from "next/server"

export class AppError extends Error {
  statusCode: number
  isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export const handleError = (error: unknown) => {
  console.error("Application Error:", error)

  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode })
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }

  return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 })
}

export const createError = (message: string, statusCode: number) => {
  return new AppError(message, statusCode)
}

// Common error responses
export const errors = {
  unauthorized: () => createError("Unauthorized access", 401),
  forbidden: () => createError("Access forbidden", 403),
  notFound: (resource: string) => createError(`${resource} not found`, 404),
  badRequest: (message: string) => createError(message, 400),
  conflict: (message: string) => createError(message, 409),
  tooManyRequests: () => createError("Too many requests", 429),
  internalServer: () => createError("Internal server error", 500),
}
