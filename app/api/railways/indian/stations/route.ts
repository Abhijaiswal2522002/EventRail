import { type NextRequest, NextResponse } from "next/server"
import { getIndianStations } from "@/lib/indian-railway-api"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    const stations = await getIndianStations()

    let filteredStations = stations

    if (query) {
      filteredStations = stations.filter(
        (station) =>
          station.station_name.toLowerCase().includes(query.toLowerCase()) ||
          station.station_code.toLowerCase().includes(query.toLowerCase()),
      )
    }

    return NextResponse.json({
      stations: filteredStations.slice(0, 20), // Limit to 20 results
    })
  } catch (error) {
    console.error("Error fetching Indian stations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
