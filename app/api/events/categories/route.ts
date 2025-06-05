import { NextResponse } from "next/server"
import { getEventCategories } from "@/lib/indian-events-api"

export async function GET() {
  try {
    const categories = await getEventCategories()

    return NextResponse.json({
      success: true,
      data: categories,
      message: "Categories retrieved successfully",
    })
  } catch (error) {
    console.error("Categories fetch error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch categories",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
