import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ObjectId } from "mongodb"
import { createPaymentIntent } from "@/lib/payment"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { trainId, journeyDate, class: travelClass, passengers } = await request.json()
    const db = await getDatabase()

    // Get train details
    const train = await db.collection("trains").findOne({
      _id: new ObjectId(trainId),
    })

    if (!train) {
      return NextResponse.json({ error: "Train not found" }, { status: 404 })
    }

    // Find class details
    const classDetails = train.classes.find((cls: { name: string }) => cls.name === travelClass)

    if (!classDetails) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 })
    }

    // Check availability
    if (classDetails.availableSeats < passengers.length) {
      return NextResponse.json({ error: "Not enough seats available" }, { status: 400 })
    }

    const totalAmount = classDetails.price * passengers.length

    // Create payment intent
    const paymentIntent = await createPaymentIntent(totalAmount);


    // Generate PNR
    const pnr = `PNR${Date.now()}`

    // Create booking
    const booking = {
      userId: session.user.id,
      trainId,
      journeyDate: new Date(journeyDate),
      class: travelClass,
      passengers,
      totalAmount,
      status: "pending",
      pnr,
      paymentId: paymentIntent.id,
      createdAt: new Date(),
    }

    const result = await db.collection("railwayBookings").insertOne(booking)

    return NextResponse.json({
      bookingId: result.insertedId,
      clientSecret: paymentIntent.client_secret,
      pnr,
      totalAmount,
    })
  } catch (error) {
    console.error("Railway booking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
