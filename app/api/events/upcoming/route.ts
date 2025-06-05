import { type NextRequest, NextResponse } from "next/server"
import { getUpcomingEvents } from "@/lib/indian-events-api"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city") || undefined
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const events = await getUpcomingEvents(city, limit)

    return NextResponse.json({
      success: true,
      data: events,
      message: `Found ${events.length} upcoming events`,
    })
  } catch (error) {
    console.error("Upcoming events fetch error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch upcoming events",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
