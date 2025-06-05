import { notFound } from "next/navigation"
import Link from "next/link"
import { getTrainRoute, getLiveTrainStatus } from "@/lib/indian-railway-api"

interface TrainDetailsPageProps {
  params: {
    id: string
  }
  searchParams: {
    date?: string
  }
}

export default async function TrainDetailsPage({ params, searchParams }: TrainDetailsPageProps) {
  const trainNumber = params.id
  const journeyDate = searchParams.date || new Date().toISOString().split("T")[0]

  try {
    // Fetch train route using IRCTC API
    const route = await getTrainRoute(trainNumber)

    // Get live status if available
    const liveStatus = await getLiveTrainStatus(trainNumber, journeyDate)

    if (!route || route.length === 0) {
      notFound()
    }

    // Extract train information from route
    const fromStation = route[0]
    const toStation = route[route.length - 1]
    const trainName =
      trainNumber === "12951"
        ? "Mumbai Rajdhani Express"
        : trainNumber === "12301"
          ? "Howrah Rajdhani Express"
          : trainNumber === "12621"
            ? "Tamil Nadu Express"
            : "Express Train"

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/railways" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Railways
          </Link>
          <h1 className="text-3xl font-bold mb-2">{trainName}</h1>
          <p className="text-lg text-gray-600">Train Number: {trainNumber}</p>
        </div>

        {liveStatus && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">Live Status</h2>
            <p className="text-green-600 font-medium">{liveStatus.position}</p>
            <p className="text-gray-600">{liveStatus.last_location}</p>
            <p className="text-gray-600">
              Next Station: {liveStatus.next_station} (ETA: {liveStatus.eta})
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date(liveStatus.last_updated).toLocaleString()}
            </p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Journey Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">From</p>
              <p className="font-medium">
                {fromStation.station_name} ({fromStation.station_code})
              </p>
              <p className="text-gray-600">Departure: {fromStation.departure_time}</p>
            </div>
            <div>
              <p className="text-gray-600">To</p>
              <p className="font-medium">
                {toStation.station_name} ({toStation.station_code})
              </p>
              <p className="text-gray-600">Arrival: {toStation.arrival_time}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">Journey Date</p>
            <p className="font-medium">{journeyDate}</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">Distance</p>
            <p className="font-medium">{toStation.distance}</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">Duration</p>
            <p className="font-medium">
              {calculateDuration(fromStation.departure_time, toStation.arrival_time, toStation.day - fromStation.day)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Route & Schedule</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-gray-600">Station</th>
                  <th className="px-4 py-2 text-left text-gray-600">Arrival</th>
                  <th className="px-4 py-2 text-left text-gray-600">Departure</th>
                  <th className="px-4 py-2 text-left text-gray-600">Halt</th>
                  <th className="px-4 py-2 text-left text-gray-600">Distance</th>
                  <th className="px-4 py-2 text-left text-gray-600">Day</th>
                </tr>
              </thead>
              <tbody>
                {route.map((station, index) => (
                  <tr key={station.station_code} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3">
                      <div className="font-medium">{station.station_name}</div>
                      <div className="text-sm text-gray-500">{station.station_code}</div>
                    </td>
                    <td className="px-4 py-3">{station.arrival_time}</td>
                    <td className="px-4 py-3">{station.departure_time}</td>
                    <td className="px-4 py-3">{station.halt_time}</td>
                    <td className="px-4 py-3">{station.distance}</td>
                    <td className="px-4 py-3">{station.day}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Book Tickets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["1A", "2A", "3A", "SL"].map((classType) => (
              <div key={classType} className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">{getClassName(classType)}</h3>
                <p className="text-gray-600 mb-1">Class: {classType}</p>
                <p className="text-gray-600 mb-3">Fare: ₹{getFare(classType, toStation.distance)}</p>
                <Link
                  href={`/railways/booking?train=${trainNumber}&class=${classType}&from=${fromStation.station_code}&to=${toStation.station_code}&date=${journeyDate}`}
                  className="block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching train details:", error)
    notFound()
  }
}

// Helper functions
function calculateDuration(departure: string, arrival: string, days = 0): string {
  const [depHours, depMinutes] = departure.split(":").map(Number)
  const [arrHours, arrMinutes] = arrival.split(":").map(Number)

  const totalMinutes = (arrHours + days * 24) * 60 + arrMinutes - (depHours * 60 + depMinutes)

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours}h ${minutes}m`
}

function getClassName(classType: string): string {
  const classNames: Record<string, string> = {
    "1A": "First AC",
    "2A": "Second AC",
    "3A": "Third AC",
    SL: "Sleeper",
    CC: "Chair Car",
    "2S": "Second Sitting",
    EC: "Executive Chair Car",
  }

  return classNames[classType] || classType
}

function getFare(classType: string, distance: string): number {
  const distanceNum = Number.parseInt(distance.replace(/[^0-9]/g, ""), 10) || 0

  const baseFares: Record<string, number> = {
    "1A": 3.5,
    "2A": 2.5,
    "3A": 1.8,
    SL: 0.8,
    CC: 1.5,
    "2S": 0.6,
    EC: 4.0,
  }

  const baseFare = baseFares[classType] || 1.0
  return Math.round(distanceNum * baseFare)
}
