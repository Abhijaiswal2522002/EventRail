import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()

    // Get event bookings
    const eventBookings = await db
      .collection("eventBookings")
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray()

    // Get railway bookings
    const railwayBookings = await db
      .collection("railwayBookings")
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray()

    // Populate event details
    const eventBookingsWithDetails = await Promise.all(
      eventBookings.map(async (booking) => {
        const event = await db.collection("events").findOne({
          _id: new ObjectId(booking.eventId),
        })
        return { ...booking, event }
      }),
    )

    // Populate train details
    const railwayBookingsWithDetails = await Promise.all(
      railwayBookings.map(async (booking) => {
        const train = await db.collection("trains").findOne({
          _id: new ObjectId(booking.trainId),
        })
        return { ...booking, train }
      }),
    )

    return NextResponse.json({
      eventBookings: eventBookingsWithDetails,
      railwayBookings: railwayBookingsWithDetails,
    })
  } catch (error) {
    console.error("Bookings fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
