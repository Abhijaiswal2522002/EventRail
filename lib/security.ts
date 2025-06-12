import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { rateLimit } from "express-rate-limit"

// Password hashing utilities
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}

// JWT utilities
export const generateToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error("JWT_SECRET is not configured")
  }
  return jwt.sign(payload, secret, { expiresIn: "7d" })
}

export const verifyToken = (token: string): unknown => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error("JWT_SECRET is not configured")
  }
  return jwt.verify(token, secret)
}

// Rate limiting configuration
export const createRateLimit = (windowMs: number, max: number) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: "Too many requests, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
}

// Common rate limits
export const authRateLimit = createRateLimit(15 * 60 * 1000, 5) // 5 attempts per 15 minutes
export const apiRateLimit = createRateLimit(15 * 60 * 1000, 100) // 100 requests per 15 minutes
export const searchRateLimit = createRateLimit(60 * 1000, 30) // 30 searches per minute

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, "")
}

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone number validation (Indian format)
export const isValidIndianPhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\D/g, ""))
}
