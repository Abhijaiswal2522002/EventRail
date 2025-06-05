import { z } from "zod"

// User validation schemas
export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

// Event validation schemas
export const eventSearchSchema = z.object({
  query: z.string().optional(),
  city: z.string().optional(),
  category: z.string().optional(),
  language: z.string().optional(),
  date: z.string().optional(),
})

export const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  language: z.string().min(1, "Language is required"),
  price: z.number().min(0, "Price must be positive"),
})

// Railway validation schemas
export const railwaySearchSchema = z.object({
  from: z.string().min(1, "Source station is required"),
  to: z.string().min(1, "Destination station is required"),
  date: z.string().min(1, "Travel date is required"),
  class: z.string().optional(),
})

// Booking validation schemas
export const bookingSchema = z.object({
  eventId: z.string().optional(),
  trainId: z.string().optional(),
  passengers: z
    .array(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        age: z.number().min(1).max(120, "Invalid age"),
        gender: z.enum(["male", "female", "other"]),
      }),
    )
    .min(1, "At least one passenger is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(10, "Invalid phone number"),
})

// Profile validation schemas
export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type EventSearchInput = z.infer<typeof eventSearchSchema>
export type CreateEventInput = z.infer<typeof createEventSchema>
export type RailwaySearchInput = z.infer<typeof railwaySearchSchema>
export type BookingInput = z.infer<typeof bookingSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
