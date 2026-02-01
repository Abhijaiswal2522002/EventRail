import nodemailer from "nodemailer"

interface BookingDetails {
  [key: string]: string | number
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEventBookingConfirmation(email: string, bookingDetails: BookingDetails): Promise<void> {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: "Event Booking Confirmation - EventRail",
    html: `
      <h1>Booking Confirmed!</h1>
      <p>Your event booking has been confirmed.</p>
      <h2>Booking Details:</h2>
      <p><strong>Event:</strong> ${bookingDetails.eventTitle}</p>
      <p><strong>Date:</strong> ${bookingDetails.date}</p>
      <p><strong>Time:</strong> ${bookingDetails.time}</p>
      <p><strong>Location:</strong> ${bookingDetails.location}</p>
      <p><strong>Booking ID:</strong> ${bookingDetails.bookingId}</p>
      <p><strong>Total Amount:</strong> $${bookingDetails.totalAmount}</p>
    `,
  }

  await transporter.sendMail(mailOptions)
}

export async function sendRailwayBookingConfirmation(email: string, bookingDetails: BookingDetails): Promise<void> {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: "Railway Booking Confirmation - EventRail",
    html: `
      <h1>Railway Booking Confirmed!</h1>
      <p>Your train ticket has been booked successfully.</p>
      <h2>Booking Details:</h2>
      <p><strong>Train:</strong> ${bookingDetails.trainName} (${bookingDetails.trainNumber})</p>
      <p><strong>Route:</strong> ${bookingDetails.source} → ${bookingDetails.destination}</p>
      <p><strong>Date:</strong> ${bookingDetails.journeyDate}</p>
      <p><strong>Time:</strong> ${bookingDetails.departureTime} - ${bookingDetails.arrivalTime}</p>
      <p><strong>Class:</strong> ${bookingDetails.class}</p>
      <p><strong>PNR:</strong> ${bookingDetails.pnr}</p>
      <p><strong>Total Amount:</strong> $${bookingDetails.totalAmount}</p>
    `,
  }

  await transporter.sendMail(mailOptions)
}
