const RAILWAY_API_BASE = "https://indianrailapi.com/api/v2"
const IRCTC_API_BASE = "https://www.irctc.co.in/eticketing/webapi"

export interface IndianStation {
  station_code: string
  station_name: string
  state_code: string
  zone_code: string
}

export interface IndianTrain {
  train_number: string
  train_name: string
  from_station_code: string
  from_station_name: string
  to_station_code: string
  to_station_name: string
  departure_time: string
  arrival_time: string
  duration: string
  distance: string
  classes: string[]
  days: string[]
}

export interface TrainRoute {
  station_code: string
  station_name: string
  arrival_time: string
  departure_time: string
  halt_time: string
  distance: string
  day: number
}

export interface SeatAvailability {
  class_type: string
  status: string
  fare: number
}

// Get all Indian railway stations
export async function getIndianStations(): Promise<IndianStation[]> {
  try {
    // Using a mock API endpoint - replace with actual API
    const response = await fetch(`${RAILWAY_API_BASE}/stations/list`, {
      headers: {
        Authorization: `Bearer ${process.env.RAILWAY_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch stations")
    }

    const data = await response.json()
    return data.stations || []
  } catch (error) {
    console.error("Error fetching stations:", error)
    // Return mock data for development
    return getMockIndianStations()
  }
}

// Search trains between stations
export async function searchIndianTrains(
  fromStation: string,
  toStation: string,
  journeyDate: string,
): Promise<IndianTrain[]> {
  try {
    const response = await fetch(
      `${RAILWAY_API_BASE}/trains/search?from=${fromStation}&to=${toStation}&date=${journeyDate}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.RAILWAY_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to search trains")
    }

    const data = await response.json()
    return data.trains || []
  } catch (error) {
    console.error("Error searching trains:", error)
    // Return mock data for development
    return getMockIndianTrains(fromStation, toStation)
  }
}

// Get train route and schedule
export async function getTrainRoute(trainNumber: string): Promise<TrainRoute[]> {
  try {
    const response = await fetch(`${RAILWAY_API_BASE}/trains/${trainNumber}/route`, {
      headers: {
        Authorization: `Bearer ${process.env.RAILWAY_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch train route")
    }

    const data = await response.json()
    return data.route || []
  } catch (error) {
    console.error("Error fetching train route:", error)
    return []
  }
}

// Check seat availability
export async function checkSeatAvailability(
  trainNumber: string,
  fromStation: string,
  toStation: string,
  journeyDate: string,
  classType: string,
): Promise<SeatAvailability> {
  try {
    const response = await fetch(
      `${RAILWAY_API_BASE}/trains/${trainNumber}/availability?from=${fromStation}&to=${toStation}&date=${journeyDate}&class=${classType}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.RAILWAY_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to check availability")
    }

    const data = await response.json()
    return data.availability
  } catch (error) {
    console.error("Error checking availability:", error)
    return {
      class_type: classType,
      status: "AVAILABLE",
      fare: 500,
    }
  }
}

// Mock data for development
function getMockIndianStations(): IndianStation[] {
  return [
    { station_code: "NDLS", station_name: "New Delhi", state_code: "DL", zone_code: "NR" },
    { station_code: "BCT", station_name: "Mumbai Central", state_code: "MH", zone_code: "WR" },
    { station_code: "MAS", station_name: "Chennai Central", state_code: "TN", zone_code: "SR" },
    { station_code: "HWH", station_name: "Howrah Junction", state_code: "WB", zone_code: "ER" },
    { station_code: "BLR", station_name: "Bangalore City", state_code: "KA", zone_code: "SWR" },
    { station_code: "PUNE", station_name: "Pune Junction", state_code: "MH", zone_code: "CR" },
    { station_code: "ADI", station_name: "Ahmedabad Junction", state_code: "GJ", zone_code: "WR" },
    { station_code: "JP", station_name: "Jaipur Junction", state_code: "RJ", zone_code: "NWR" },
    { station_code: "LKO", station_name: "Lucknow Charbagh", state_code: "UP", zone_code: "NER" },
    { station_code: "BBS", station_name: "Bhubaneswar", state_code: "OR", zone_code: "ECoR" },
    { station_code: "TVC", station_name: "Thiruvananthapuram Central", state_code: "KL", zone_code: "SR" },
    { station_code: "GHY", station_name: "Guwahati", state_code: "AS", zone_code: "NFR" },
    { station_code: "JAT", station_name: "Jammu Tawi", state_code: "JK", zone_code: "NR" },
    { station_code: "VSKP", station_name: "Visakhapatnam Junction", state_code: "AP", zone_code: "ECoR" },
    { station_code: "CBE", station_name: "Coimbatore Junction", state_code: "TN", zone_code: "SR" },
  ]
}

function getMockIndianTrains(fromStation: string, toStation: string): IndianTrain[] {
  return [
    {
      train_number: "12951",
      train_name: "Mumbai Rajdhani Express",
      from_station_code: fromStation,
      from_station_name: "New Delhi",
      to_station_code: toStation,
      to_station_name: "Mumbai Central",
      departure_time: "16:55",
      arrival_time: "08:35",
      duration: "15h 40m",
      distance: "1384 km",
      classes: ["1A", "2A", "3A"],
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    {
      train_number: "12301",
      train_name: "Howrah Rajdhani Express",
      from_station_code: fromStation,
      from_station_name: "New Delhi",
      to_station_code: toStation,
      to_station_name: "Howrah Junction",
      departure_time: "17:00",
      arrival_time: "10:05",
      duration: "17h 05m",
      distance: "1441 km",
      classes: ["1A", "2A", "3A"],
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    {
      train_number: "12621",
      train_name: "Tamil Nadu Express",
      from_station_code: fromStation,
      from_station_name: "New Delhi",
      to_station_code: toStation,
      to_station_name: "Chennai Central",
      departure_time: "22:30",
      arrival_time: "07:40",
      duration: "33h 10m",
      distance: "2180 km",
      classes: ["1A", "2A", "3A", "SL"],
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  ]
}

// PNR Status Check
export async function checkPNRStatus(pnr: string) {
  try {
    const response = await fetch(`${RAILWAY_API_BASE}/pnr/${pnr}`, {
      headers: {
        Authorization: `Bearer ${process.env.RAILWAY_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to check PNR status")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error checking PNR:", error)
    return null
  }
}

// Live train status
export async function getLiveTrainStatus(trainNumber: string, journeyDate: string) {
  try {
    const response = await fetch(`${RAILWAY_API_BASE}/trains/${trainNumber}/live?date=${journeyDate}`, {
      headers: {
        Authorization: `Bearer ${process.env.RAILWAY_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get live status")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error getting live status:", error)
    return null
  }
}
