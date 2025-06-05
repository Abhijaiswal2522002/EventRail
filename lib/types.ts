export interface User {
  _id?: string
  name: string
  email: string
  password?: string
  phone?: string
  role: "user" | "organizer" | "admin"
  createdAt: Date
  updatedAt: Date
}

export interface Event {
  _id?: string
  title: string
  description: string
  category: string
  date: Date
  startTime: string
  endTime: string
  location: {
    venueName: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  organizer: string
  image?: string
  ticketTiers: TicketTier[]
  status: "draft" | "published" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

export interface TicketTier {
  id: string
  name: string
  price: number
  description: string
  quantity: number
  sold: number
}

export interface EventBooking {
  _id?: string
  userId: string
  eventId: string
  ticketTierId: string
  quantity: number
  totalAmount: number
  status: "pending" | "confirmed" | "cancelled"
  paymentId?: string
  bookingId: string
  createdAt: Date
}

export interface Train {
  _id?: string
  trainName: string
  trainNumber: string
  source: string
  destination: string
  departureTime: string
  arrivalTime: string
  duration: string
  classes: TrainClass[]
  amenities: string[]
  status: "active" | "cancelled"
  operatingDays: string[]
}

export interface TrainClass {
  name: string
  price: number
  totalSeats: number
  availableSeats: number
}

export interface RailwayBooking {
  _id?: string
  userId: string
  trainId: string
  journeyDate: Date
  class: string
  passengers: Passenger[]
  totalAmount: number
  status: "pending" | "confirmed" | "cancelled"
  pnr: string
  paymentId?: string
  createdAt: Date
}

export interface Passenger {
  name: string
  age: number
  gender: "male" | "female" | "other"
  seatNumber?: string
}
