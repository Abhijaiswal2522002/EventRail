import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import { confirmPayment } from "@/lib/payment"
import { sendEventBookingConfirmation, sendRailwayBookingConfirmation } from "@/lib/email"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, bookingType } = await request.json()

    // Confirm payment with Stripe
    const isPaymentSuccessful = await confirmPayment(paymentIntentId)

    if (!isPaymentSuccessful) {
      return NextResponse.json({ error: "Payment failed" }, { status: 400 })
    }

    const db = await getDatabase()

    if (bookingType === "event") {
      // Update event booking
      const booking = await db
        .collection("eventBookings")
        .findOneAndUpdate(
          { paymentId: paymentIntentId },
          { $set: { status: "confirmed" } },
          { returnDocument: "after" },
        )

      if (booking.value) {
        // Update ticket tier sold count
        await db.collection("events").updateOne(
          {
            _id: new ObjectId(booking.value.eventId),
            "ticketTiers.id": booking.value.ticketTierId,
          },
          {
            $inc: { "ticketTiers.$.sold": booking.value.quantity },
          },
        )

        // Send confirmation email
        const event = await db.collection("events").findOne({
          _id: new ObjectId(booking.value.eventId),
        })

        const user = await db.collection("users").findOne({
          _id: new ObjectId(booking.value.userId),
        })

        if (event && user) {
          await sendEventBookingConfirmation(user.email, {
            eventTitle: event.title,
            date: event.date,
            time: event.startTime,
            location: event.location.venueName,
            bookingId: booking.value.bookingId,
            totalAmount: booking.value.totalAmount,
          })
        }
      }
    } else if (bookingType === "railway") {
      // Update railway booking
      const booking = await db
        .collection("railwayBookings")
        .findOneAndUpdate(
          { paymentId: paymentIntentId },
          { $set: { status: "confirmed" } },
          { returnDocument: "after" },
        )

      if (booking.value) {
        // Update train seat availability
        await db.collection("trains").updateOne(
          {
            _id: new ObjectId(booking.value.trainId),
            "classes.name": booking.value.class,
          },
          {
            $inc: { "classes.$.availableSeats": -booking.value.passengers.length },
          },
        )

        // Send confirmation email
        const train = await db.collection("trains").findOne({
          _id: new ObjectId(booking.value.trainId),
        })

        const user = await db.collection("users").findOne({
          _id: new ObjectId(booking.value.userId),
        })

        if (train && user) {
          await sendRailwayBookingConfirmation(user.email, {
            trainName: train.trainName,
            trainNumber: train.trainNumber,
            source: train.source,
            destination: train.destination,
            journeyDate: booking.value.journeyDate,
            departureTime: train.departureTime,
            arrivalTime: train.arrivalTime,
            class: booking.value.class,
            pnr: booking.value.pnr,
            totalAmount: booking.value.totalAmount,
          })
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Payment confirmation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
