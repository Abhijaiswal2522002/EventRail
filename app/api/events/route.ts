import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const category = searchParams.get("category")
    const date = searchParams.get("date")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const db = await getDatabase()

    // Build query
    const query: Record<string, unknown> = { status: "published" }

    if (location) {
      query["location.city"] = { $regex: location, $options: "i" }
    }

    if (category) {
      query.category = category
    }

    if (date) {
      const searchDate = new Date(date)
      query.date = {
        $gte: searchDate,
        $lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000),
      }
    }

    const events = await db
      .collection("events")
      .find(query)
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    const total = await db.collection("events").countDocuments(query)

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Events fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const eventData = await request.json()
    const db = await getDatabase()

    const event = {
      ...eventData,
      organizer: session.user.email, // Using email as the user identifier
      status: "published",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("events").insertOne(event)

    return NextResponse.json({ message: "Event created successfully", eventId: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Event creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
