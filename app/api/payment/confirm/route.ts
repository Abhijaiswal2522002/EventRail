import { type NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { confirmPayment } from "@/lib/payment";
import {
  sendEventBookingConfirmation,
  sendRailwayBookingConfirmation,
} from "@/lib/email";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, bookingType } = await request.json();

    const isPaymentSuccessful = await confirmPayment(paymentIntentId);

    if (!isPaymentSuccessful) {
      return NextResponse.json({ error: "Payment failed" }, { status: 400 });
    }

    const db = await getDatabase();

    if (bookingType === "event") {
     const bookingResult = await db.collection("railwayBookings").findOneAndUpdate(
  { paymentId: paymentIntentId },
  { $set: { status: "confirmed" } },
  { returnDocument: "after" }
);

const booking = bookingResult?.value;

if (!booking) {
  return NextResponse.json({ error: "Booking not found" }, { status: 404 });
}


      await db.collection("events").updateOne(
        {
          _id: new ObjectId(booking.eventId),
          "ticketTiers.id": booking.ticketTierId,
        },
        {
          $inc: { "ticketTiers.$.sold": booking.quantity },
        }
      );

      const event = await db.collection("events").findOne({
        _id: new ObjectId(booking.eventId),
      });

      const user = await db.collection("users").findOne({
        _id: new ObjectId(booking.userId),
      });

      if (event && user) {
        await sendEventBookingConfirmation(user.email, {
          eventTitle: event.title,
          date: event.date,
          time: event.startTime,
          location: event.location.venueName,
          bookingId: booking.bookingId,
          totalAmount: booking.totalAmount,
        });
      }
    } else if (bookingType === "railway") {
     const bookingResult = await db.collection("eventBookings").findOneAndUpdate(
  { paymentId: paymentIntentId },
  { $set: { status: "confirmed" } },
  { returnDocument: "after" }
);

const booking = bookingResult?.value;

if (!booking) {
  return NextResponse.json({ error: "Booking not found" }, { status: 404 });
}


      await db.collection("trains").updateOne(
        {
          _id: new ObjectId(booking.trainId),
          "classes.name": booking.class,
        },
        {
          $inc: { "classes.$.availableSeats": -booking.passengers.length },
        }
      );

      const train = await db.collection("trains").findOne({
        _id: new ObjectId(booking.trainId),
      });

      const user = await db.collection("users").findOne({
        _id: new ObjectId(booking.userId),
      });

      if (train && user) {
        await sendRailwayBookingConfirmation(user.email, {
          trainName: train.trainName,
          trainNumber: train.trainNumber,
          source: train.source,
          destination: train.destination,
          journeyDate: booking.journeyDate,
          departureTime: train.departureTime,
          arrivalTime: train.arrivalTime,
          class: booking.class,
          pnr: booking.pnr,
          totalAmount: booking.totalAmount,
        });
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Payment confirmation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
