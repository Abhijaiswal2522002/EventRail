import { type NextRequest, NextResponse } from "next/server"
import { getEventsByLocation } from "@/lib/indian-events-api"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const radius = searchParams.get("radius")
    const limit = searchParams.get("limit")

    if (!lat || !lng) {
      return NextResponse.json(
        {
          success: false,
          error: "Latitude and longitude are required",
        },
        { status: 400 },
      )
    }

    const events = await getEventsByLocation(
      Number.parseFloat(lat),
      Number.parseFloat(lng),
      radius ? Number.parseInt(radius) : undefined,
    )

    const limitedEvents = limit ? events.slice(0, Number.parseInt(limit)) : events

    return NextResponse.json({
      success: true,
      data: limitedEvents,
      message: "Location-based events retrieved successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Location-based events search error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to search events by location",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
