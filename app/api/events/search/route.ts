import { type NextRequest, NextResponse } from "next/server"
import { searchEvents } from "@/lib/indian-events-api"
import type { EventSearchParams } from "@/lib/indian-events-api"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const params: EventSearchParams = {
      query: searchParams.get("q") || undefined,
      city: searchParams.get("city") || undefined,
      state: searchParams.get("state") || undefined,
      category: searchParams.get("category") || undefined,
      subcategory: searchParams.get("subcategory") || undefined,
      date: searchParams.get("date") || undefined,
      language: searchParams.get("language") || undefined,
      sortBy: (searchParams.get("sortBy") as any) || "date",
      sortOrder: (searchParams.get("sortOrder") as any) || "asc",
      page: Number.parseInt(searchParams.get("page") || "1"),
      limit: Number.parseInt(searchParams.get("limit") || "20"),
    }

    // Handle date range
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    if (startDate && endDate) {
      params.dateRange = { start: startDate, end: endDate }
    }

    // Handle price range
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    if (minPrice && maxPrice) {
      params.priceRange = {
        min: Number.parseInt(minPrice),
        max: Number.parseInt(maxPrice),
      }
    }

    // Handle location coordinates
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const radius = searchParams.get("radius")
    if (lat && lng) {
      params.lat = Number.parseFloat(lat)
      params.lng = Number.parseFloat(lng)
      if (radius) {
        params.radius = Number.parseInt(radius)
      }
    }

    // Handle tags
    const tags = searchParams.get("tags")
    if (tags) {
      params.tags = tags.split(",")
    }

    const result = await searchEvents(params)

    return NextResponse.json({
      success: true,
      data: result,
      message: "Events retrieved successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Events search error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to search events",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const params: EventSearchParams = body

    const result = await searchEvents(params)

    return NextResponse.json({
      success: true,
      data: result,
      message: "Events retrieved successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Events search error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to search events",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
