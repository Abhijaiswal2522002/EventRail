import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Filter, Train, Wifi, Coffee, Utensils } from "lucide-react"
import IndianRailwaySearch from "@/components/indian-railway-search"

// Indian trains data
const indianTrains = [
  {
    id: "1",
    trainName: "Mumbai Rajdhani Express",
    trainNumber: "12951",
    source: "New Delhi",
    sourceCode: "NDLS",
    destination: "Mumbai Central",
    destinationCode: "BCT",
    departureTime: "4:55 PM",
    arrivalTime: "8:35 AM",
    duration: "15h 40m",
    distance: "1384 km",
    price: "₹3,500",
    classes: ["1A", "2A", "3A"],
    amenities: ["wifi", "food", "coffee"],
    availability: "Available",
    type: "Rajdhani",
  },
  {
    id: "2",
    trainName: "Howrah Rajdhani Express",
    trainNumber: "12301",
    source: "New Delhi",
    sourceCode: "NDLS",
    destination: "Howrah Junction",
    destinationCode: "HWH",
    departureTime: "5:00 PM",
    arrivalTime: "10:05 AM",
    duration: "17h 05m",
    distance: "1441 km",
    price: "₹3,200",
    classes: ["1A", "2A", "3A"],
    amenities: ["wifi", "food", "coffee"],
    availability: "Available",
    type: "Rajdhani",
  },
  {
    id: "3",
    trainName: "Tamil Nadu Express",
    trainNumber: "12621",
    source: "New Delhi",
    sourceCode: "NDLS",
    destination: "Chennai Central",
    destinationCode: "MAS",
    departureTime: "10:30 PM",
    arrivalTime: "7:40 AM",
    duration: "33h 10m",
    distance: "2180 km",
    price: "₹2,800",
    classes: ["1A", "2A", "3A", "SL"],
    amenities: ["wifi", "food", "coffee"],
    availability: "Available",
    type: "Express",
  },
  {
    id: "4",
    trainName: "Udyan Express",
    trainNumber: "11301",
    source: "Mumbai Central",
    sourceCode: "BCT",
    destination: "Bangalore City",
    destinationCode: "BLR",
    departureTime: "8:05 AM",
    arrivalTime: "10:40 PM",
    duration: "14h 35m",
    distance: "1279 km",
    price: "₹1,800",
    classes: ["2A", "3A", "SL"],
    amenities: ["wifi", "food"],
    availability: "Available",
    type: "Express",
  },
  {
    id: "5",
    trainName: "Shatabdi Express",
    trainNumber: "12001",
    source: "New Delhi",
    sourceCode: "NDLS",
    destination: "Chandigarh",
    destinationCode: "CDG",
    departureTime: "7:20 AM",
    arrivalTime: "10:35 AM",
    duration: "3h 15m",
    distance: "259 km",
    price: "₹1,200",
    classes: ["CC", "EC"],
    amenities: ["wifi", "food", "coffee"],
    availability: "Available",
    type: "Shatabdi",
  },
  {
    id: "6",
    trainName: "Duronto Express",
    trainNumber: "12259",
    source: "New Delhi",
    sourceCode: "NDLS",
    destination: "Kanyakumari",
    destinationCode: "CAPE",
    departureTime: "11:45 AM",
    arrivalTime: "8:30 PM",
    duration: "56h 45m",
    distance: "3787 km",
    price: "₹4,200",
    classes: ["1A", "2A", "3A", "SL"],
    amenities: ["wifi", "food", "coffee"],
    availability: "Limited",
    type: "Duronto",
  },
]

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "wifi":
      return <Wifi className="h-4 w-4" />
    case "food":
      return <Utensils className="h-4 w-4" />
    case "coffee":
      return <Coffee className="h-4 w-4" />
    default:
      return null
  }
}

export default function RailwaysPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Indian Railway Booking</h1>
          <p className="text-muted-foreground">Find and book train tickets across India with real-time availability</p>
        </div>

        <div className="rounded-lg border">
          <IndianRailwaySearch />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Showing {indianTrains.length} trains</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Sort by Price
            </Button>
            <Button variant="outline" size="sm">
              Sort by Duration
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {indianTrains.map((train) => (
            <Card key={train.id} className="overflow-hidden transition-all hover:shadow-md border-green-100">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-100 to-green-100">
                      <Train className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{train.trainName}</h3>
                      <p className="text-sm text-muted-foreground">{train.trainNumber}</p>
                      <Badge variant="outline" className="mt-1 text-xs border-green-200 text-green-700">
                        {train.type}
                      </Badge>
                    </div>
                  </div>
                  <Badge
                    variant={train.availability === "Available" ? "default" : "secondary"}
                    className={train.availability === "Available" ? "bg-green-600" : ""}
                  >
                    {train.availability}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pb-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center justify-between md:justify-start">
                    <div className="text-center md:text-left">
                      <p className="font-semibold">{train.source}</p>
                      <p className="text-xs text-muted-foreground">{train.sourceCode}</p>
                      <p className="text-sm text-muted-foreground">{train.departureTime}</p>
                    </div>
                    <div className="mx-4 flex flex-col items-center md:mx-8">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{train.duration}</span>
                      </div>
                      <div className="relative mt-2 h-[2px] w-20 bg-gradient-to-r from-orange-400 to-green-400">
                        <div className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full bg-orange-500" />
                        <div className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{train.distance}</p>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="font-semibold">{train.destination}</p>
                      <p className="text-xs text-muted-foreground">{train.destinationCode}</p>
                      <p className="text-sm text-muted-foreground">{train.arrivalTime}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">Available Classes:</p>
                    <div className="flex flex-wrap gap-1">
                      {train.classes.map((cls) => (
                        <Badge key={cls} variant="outline" className="text-xs border-green-200 text-green-700">
                          {cls}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">Amenities:</p>
                    <div className="flex gap-2">
                      {train.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-1 text-muted-foreground">
                          {getAmenityIcon(amenity)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-green-50 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Starting from</span>
                  <span className="text-2xl font-bold text-green-600">{train.price}</span>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" className="border-green-200 hover:bg-green-50">
                    <Link href={`/railways/train/${train.id}`}>View Details</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700"
                  >
                    <Link href={`/railways/book?train=${train.id}`}>Book Now</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
