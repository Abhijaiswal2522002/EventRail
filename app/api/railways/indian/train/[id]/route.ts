import { type NextRequest, NextResponse } from "next/server"
import { getTrainRoute, getLiveTrainStatus } from "@/lib/indian-railway-api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const trainNumber = params.id
    const { searchParams } = new URL(request.url)
    const journeyDate = searchParams.get("date") || new Date().toISOString().split("T")[0]

    // Get train route using IRCTC API
    const route = await getTrainRoute(trainNumber)

    // Get live status if requested
    const liveStatus = await getLiveTrainStatus(trainNumber, journeyDate)

    return NextResponse.json({
      train_number: trainNumber,
      route,
      live_status: liveStatus,
    })
  } catch (error) {
    console.error("Error fetching train details with IRCTC API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
