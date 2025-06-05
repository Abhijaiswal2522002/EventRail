import { type NextRequest, NextResponse } from "next/server"
import { searchIndianTrains, checkSeatAvailability } from "@/lib/indian-railway-api"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fromStation = searchParams.get("from")
    const toStation = searchParams.get("to")
    const journeyDate = searchParams.get("date")

    if (!fromStation || !toStation || !journeyDate) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const trains = await searchIndianTrains(fromStation, toStation, journeyDate)

    // Get availability for each train and class
    const trainsWithAvailability = await Promise.all(
      trains.map(async (train) => {
        const availabilityPromises = train.classes.map(async (classType) => {
          const availability = await checkSeatAvailability(
            train.train_number,
            fromStation,
            toStation,
            journeyDate,
            classType,
          )
          return {
            class: classType,
            ...availability,
          }
        })

        const classAvailability = await Promise.all(availabilityPromises)

        return {
          ...train,
          availability: classAvailability,
        }
      }),
    )

    return NextResponse.json({
      trains: trainsWithAvailability,
      searchParams: {
        from: fromStation,
        to: toStation,
        date: journeyDate,
      },
    })
  } catch (error) {
    console.error("Error searching Indian trains:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
