export const APP_CONFIG = {
  name: "EventRail",
  description: "Discover events and book railway tickets across India",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  supportEmail: "support@eventrail.com",
} as const

// API endpoints
export const API_ENDPOINTS = {
  events: "/api/events",
  railways: "/api/railways",
  auth: "/api/auth",
  profile: "/api/profile",
  payment: "/api/payment",
} as const

// Event categories
export const EVENT_CATEGORIES = [
  "concert",
  "festival",
  "conference",
  "workshop",
  "comedy",
  "theater",
  "sports",
  "exhibition",
] as const

// Railway classes
export const RAILWAY_CLASSES = [
  { code: "1A", name: "First AC" },
  { code: "2A", name: "Second AC" },
  { code: "3A", name: "Third AC" },
  { code: "SL", name: "Sleeper" },
  { code: "CC", name: "Chair Car" },
  { code: "2S", name: "Second Sitting" },
] as const

// Indian cities for events and railways
export const INDIAN_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Coimbatore",
] as const

// Languages commonly used in Indian events
export const INDIAN_LANGUAGES = [
  "Hindi",
  "English",
  "Tamil",
  "Telugu",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Urdu",
] as const
