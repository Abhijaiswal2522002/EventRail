import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import { sampleIndianEvents, indianEventCategories } from "@/lib/indian-events-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city")
    const category = searchParams.get("category")
    const date = searchParams.get("date")
    const language = searchParams.get("language")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const db = await getDatabase()

    // Build query for Indian events
    const query: any = {
      status: "published",
      // Add India-specific filters
    }

    if (city) {
      query["location.city"] = { $regex: city, $options: "i" }
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

    if (language) {
      query.language = { $in: [language] }
    }

    // For development, return sample data
    let events = sampleIndianEvents

    // Apply filters to sample data
    if (city) {
      events = events.filter((event) => event.location.city.toLowerCase().includes(city.toLowerCase()))
    }

    if (category) {
      events = events.filter((event) => event.category === category)
    }

    if (language) {
      events = events.filter((event) => event.language?.includes(language))
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const paginatedEvents = events.slice(startIndex, startIndex + limit)

    return NextResponse.json({
      events: paginatedEvents,
      categories: indianEventCategories,
      pagination: {
        page,
        limit,
        total: events.length,
        pages: Math.ceil(events.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching Indian events:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
