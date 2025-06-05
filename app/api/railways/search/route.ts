import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const source = searchParams.get("source")
    const destination = searchParams.get("destination")
    const date = searchParams.get("date")

    if (!source || !destination || !date) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const db = await getDatabase()

    // Find trains for the route
    const trains = await db
      .collection("trains")
      .find({
        source: { $regex: source, $options: "i" },
        destination: { $regex: destination, $options: "i" },
        status: "active",
      })
      .toArray()

    // Check availability for the specific date
    const searchDate = new Date(date)
    const dayOfWeek = searchDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()

    const availableTrains = trains.filter((train) => train.operatingDays.includes(dayOfWeek))

    return NextResponse.json({ trains: availableTrains })
  } catch (error) {
    console.error("Train search error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
