import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ObjectId } from "mongodb"
import { createPaymentIntent } from "@/lib/utils/payment"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { ticketTierId, quantity } = await request.json()
    const db = await getDatabase()

    // Get event details
    const event = await db.collection("events").findOne({
      _id: new ObjectId(params.id),
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Find ticket tier
    const ticketTier = event.ticketTiers.find((tier: { id: string }) => tier.id === ticketTierId)

    if (!ticketTier) {
      return NextResponse.json({ error: "Ticket tier not found" }, { status: 404 })
    }

    // Check availability
    if (ticketTier.sold + quantity > ticketTier.quantity) {
      return NextResponse.json({ error: "Not enough tickets available" }, { status: 400 })
    }

    const totalAmount = ticketTier.price * quantity

    // Create payment intent
    const paymentResult = await createPaymentIntent(totalAmount)

    if (!paymentResult.success || !paymentResult.paymentIntent) {
      return NextResponse.json(
        {
          error: paymentResult.error?.message || "Failed to create payment",
        },
        { status: 400 },
      )
    }

    // Create booking
    const booking = {
      userEmail: session.user.email,
      eventId: params.id,
      ticketTierId,
      quantity,
      totalAmount,
      status: "pending",
      paymentId: paymentResult.paymentIntent.id,
      bookingId: `EVT-${Date.now()}`,
      createdAt: new Date(),
    }

    const result = await db.collection("eventBookings").insertOne(booking)

    return NextResponse.json({
      bookingId: result.insertedId,
      clientSecret: paymentResult.paymentIntent.id, // Using ID as client secret for mock implementation
      totalAmount,
    })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
