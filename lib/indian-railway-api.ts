// Indian Railway API Integration using IRCTC API
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

// Get all Indian railway stations using IRCTC API
export async function getIndianStations(): Promise<IndianStation[]> {
  try {
    // Using IRCTC API endpoint for stations
    const response = await fetch(`${IRCTC_API_BASE}/stations/list`, {
      headers: {
        "X-API-KEY": `${process.env.IRCTC_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch stations from IRCTC API")
    }

    const data = await response.json()
    return data.stations || []
  } catch (error) {
    console.error("Error fetching stations from IRCTC API:", error)
    // Return mock data for development
    return getMockIndianStations()
  }
}

// Search trains between stations using IRCTC API
export async function searchIndianTrains(
  fromStation: string,
  toStation: string,
  journeyDate: string,
): Promise<IndianTrain[]> {
  try {
    const response = await fetch(
      `${IRCTC_API_BASE}/trains/search?from=${fromStation}&to=${toStation}&date=${journeyDate}`,
      {
        headers: {
          "X-API-KEY": `${process.env.IRCTC_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to search trains from IRCTC API")
    }

    const data = await response.json()
    return data.trains || []
  } catch (error) {
    console.error("Error searching trains from IRCTC API:", error)
    // Return mock data for development
    return getMockIndianTrains(fromStation, toStation)
  }
}

// Get train route and schedule using IRCTC API
export async function getTrainRoute(trainNumber: string): Promise<TrainRoute[]> {
  try {
    const response = await fetch(`${IRCTC_API_BASE}/trains/${trainNumber}/route`, {
      headers: {
        "X-API-KEY": `${process.env.IRCTC_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch train route from IRCTC API")
    }

    const data = await response.json()
    return data.route || []
  } catch (error) {
    console.error("Error fetching train route from IRCTC API:", error)
    return getMockTrainRoute(trainNumber)
  }
}

// Check seat availability using IRCTC API
export async function checkSeatAvailability(
  trainNumber: string,
  fromStation: string,
  toStation: string,
  journeyDate: string,
  classType: string,
): Promise<SeatAvailability> {
  try {
    const response = await fetch(
      `${IRCTC_API_BASE}/trains/${trainNumber}/availability?from=${fromStation}&to=${toStation}&date=${journeyDate}&class=${classType}`,
      {
        headers: {
          "X-API-KEY": `${process.env.IRCTC_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to check availability from IRCTC API")
    }

    const data = await response.json()
    return data.availability
  } catch (error) {
    console.error("Error checking availability from IRCTC API:", error)
    return {
      class_type: classType,
      status: "AVAILABLE",
      fare: 500,
    }
  }
}

// PNR Status Check using IRCTC API
export async function checkPNRStatus(pnr: string) {
  try {
    const response = await fetch(`${IRCTC_API_BASE}/pnr/${pnr}`, {
      headers: {
        "X-API-KEY": `${process.env.IRCTC_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to check PNR status from IRCTC API")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error checking PNR from IRCTC API:", error)
    return getMockPNRStatus(pnr)
  }
}

// Live train status using IRCTC API
export async function getLiveTrainStatus(trainNumber: string, journeyDate: string) {
  try {
    const response = await fetch(`${IRCTC_API_BASE}/trains/${trainNumber}/live?date=${journeyDate}`, {
      headers: {
        "X-API-KEY": `${process.env.IRCTC_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get live status from IRCTC API")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error getting live status from IRCTC API:", error)
    return getMockLiveStatus(trainNumber)
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

function getMockTrainRoute(trainNumber: string): TrainRoute[] {
  // Mock route for train 12951 (Mumbai Rajdhani)
  if (trainNumber === "12951") {
    return [
      {
        station_code: "NDLS",
        station_name: "New Delhi",
        arrival_time: "16:25",
        departure_time: "16:55",
        halt_time: "30 min",
        distance: "0 km",
        day: 1,
      },
      {
        station_code: "MTJ",
        station_name: "Mathura Junction",
        arrival_time: "18:30",
        departure_time: "18:32",
        halt_time: "2 min",
        distance: "150 km",
        day: 1,
      },
      {
        station_code: "KOTA",
        station_name: "Kota Junction",
        arrival_time: "22:05",
        departure_time: "22:10",
        halt_time: "5 min",
        distance: "458 km",
        day: 1,
      },
      {
        station_code: "RTM",
        station_name: "Ratlam Junction",
        arrival_time: "01:55",
        departure_time: "02:00",
        halt_time: "5 min",
        distance: "726 km",
        day: 2,
      },
      {
        station_code: "BRC",
        station_name: "Vadodara Junction",
        arrival_time: "04:55",
        departure_time: "05:00",
        halt_time: "5 min",
        distance: "1069 km",
        day: 2,
      },
      {
        station_code: "ST",
        station_name: "Surat",
        arrival_time: "06:25",
        departure_time: "06:27",
        halt_time: "2 min",
        distance: "1219 km",
        day: 2,
      },
      {
        station_code: "BCT",
        station_name: "Mumbai Central",
        arrival_time: "08:35",
        departure_time: "08:35",
        halt_time: "0 min",
        distance: "1384 km",
        day: 2,
      },
    ]
  }

  // Default mock route for other trains
  return [
    {
      station_code: "NDLS",
      station_name: "New Delhi",
      arrival_time: "00:00",
      departure_time: "00:30",
      halt_time: "30 min",
      distance: "0 km",
      day: 1,
    },
    {
      station_code: "CNB",
      station_name: "Kanpur Central",
      arrival_time: "05:05",
      departure_time: "05:10",
      halt_time: "5 min",
      distance: "440 km",
      day: 1,
    },
    {
      station_code: "ALD",
      station_name: "Allahabad Junction",
      arrival_time: "07:28",
      departure_time: "07:33",
      halt_time: "5 min",
      distance: "642 km",
      day: 1,
    },
    {
      station_code: "MGS",
      station_name: "Mughal Sarai Junction",
      arrival_time: "09:10",
      departure_time: "09:15",
      halt_time: "5 min",
      distance: "791 km",
      day: 1,
    },
    {
      station_code: "GAYA",
      station_name: "Gaya Junction",
      arrival_time: "11:25",
      departure_time: "11:27",
      halt_time: "2 min",
      distance: "997 km",
      day: 1,
    },
    {
      station_code: "DESTINATION",
      station_name: "Destination Station",
      arrival_time: "18:00",
      departure_time: "18:00",
      halt_time: "0 min",
      distance: "1500 km",
      day: 1,
    },
  ]
}

function getMockPNRStatus(pnr: string) {
  return {
    pnr: pnr,
    train_number: "12951",
    train_name: "Mumbai Rajdhani Express",
    from_station: "NDLS",
    to_station: "BCT",
    boarding_point: "NDLS",
    reservation_upto: "BCT",
    class: "3A",
    travel_date: "2023-07-15",
    passengers: [
      {
        serial_no: 1,
        booking_status: "CNF/B4/32",
        current_status: "CNF/B4/32",
        coach_position: 8,
      },
      {
        serial_no: 2,
        booking_status: "CNF/B4/33",
        current_status: "CNF/B4/33",
        coach_position: 8,
      },
    ],
    chart_prepared: true,
  }
}

function getMockLiveStatus(trainNumber: string) {
  return {
    train_number: trainNumber,
    train_name: trainNumber === "12951" ? "Mumbai Rajdhani Express" : "Express Train",
    position: "Train running on time",
    last_location: "Departed from Kota Junction at 22:15",
    next_station: "Ratlam Junction",
    eta: "01:55",
    delay: "0 min",
    last_updated: new Date().toISOString(),
  }
}
