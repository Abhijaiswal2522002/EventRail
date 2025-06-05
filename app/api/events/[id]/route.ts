import { type NextRequest, NextResponse } from "next/server"
import { getEventById } from "@/lib/indian-events-api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const eventId = params.id

    if (!eventId) {
      return NextResponse.json({ success: false, error: "Event ID is required" }, { status: 400 })
    }

    const event = await getEventById(eventId)

    if (!event) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: event,
      message: "Event retrieved successfully",
    })
  } catch (error) {
    console.error(`Event fetch error for ID ${params.id}:`, error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch event",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
