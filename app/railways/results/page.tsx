"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Train, Wifi, Coffee, Utensils, ArrowLeft } from "lucide-react"

// Mock search results based on query parameters
const allTrains = [
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
    price: "₹2,800",
    classes: ["1A", "2A", "3A", "SL"],
    amenities: ["wifi", "food", "coffee"],
    availability: "Available",
    type: "Express",
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

export default function RailwayResultsPage() {
  const searchParams = useSearchParams()
  const [searchResults, setSearchResults] = useState(allTrains)
  const [isLoading, setIsLoading] = useState(true)

  const source = searchParams.get("from") || "Source"
  const destination = searchParams.get("to") || "Destination"
  const date = searchParams.get("date") || "Date"

  useEffect(() => {
    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      // Filter trains based on search parameters
      let filtered = allTrains

      if (source && source !== "Source") {
        filtered = filtered.filter(
          (train) => train.sourceCode === source || train.source.toLowerCase().includes(source.toLowerCase()),
        )
      }

      if (destination && destination !== "Destination") {
        filtered = filtered.filter(
          (train) =>
            train.destinationCode === destination ||
            train.destination.toLowerCase().includes(destination.toLowerCase()),
        )
      }

      setSearchResults(filtered)
      setIsLoading(false)
    }, 1000)
  }, [source, destination, date])

  const getStationName = (code: string) => {
    const stations = {
      NDLS: "New Delhi",
      BCT: "Mumbai Central",
      MAS: "Chennai Central",
      HWH: "Howrah Junction",
      BLR: "Bangalore City",
    }
    return stations[code as keyof typeof stations] || code
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-4 text-lg font-semibold">Searching trains...</p>
            <p className="text-muted-foreground">Please wait while we find the best options for you</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/railways">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Search Results</h1>
            <p className="text-muted-foreground">
              {getStationName(source)} → {getStationName(destination)} on {date}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-primary/10 via-yellow-50 to-accent/10 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="font-bold text-lg">{getStationName(source)}</p>
                <p className="text-sm text-muted-foreground">From</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-[2px] w-16 bg-gradient-to-r from-primary to-accent" />
                <Train className="h-6 w-6 text-primary" />
                <div className="h-[2px] w-16 bg-gradient-to-r from-primary to-accent" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{getStationName(destination)}</p>
                <p className="text-sm text-muted-foreground">To</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{date}</p>
              <p className="text-sm text-muted-foreground">Journey Date</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Found {searchResults.length} trains</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
              Sort by Price
            </Button>
            <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
              Sort by Duration
            </Button>
          </div>
        </div>

        {searchResults.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
              <Train className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No trains found</h3>
            <p className="text-muted-foreground mb-4">
              No trains available for the selected route and date. Try different stations or dates.
            </p>
            <Button asChild>
              <Link href="/railways">Search Again</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6">
            {searchResults.map((train) => (
              <Card
                key={train.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl border-primary/20"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-accent to-primary">
                        <Train className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{train.trainName}</h3>
                        <p className="text-sm text-muted-foreground">{train.trainNumber}</p>
                        <Badge variant="outline" className="mt-1 text-xs border-primary text-primary">
                          {train.type}
                        </Badge>
                      </div>
                    </div>
                    <Badge
                      variant={train.availability === "Available" ? "default" : "secondary"}
                      className={train.availability === "Available" ? "bg-accent text-white" : ""}
                    >
                      {train.availability}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pb-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="font-semibold">{getStationName(source)}</p>
                        <p className="text-sm text-muted-foreground">{train.departureTime}</p>
                      </div>
                      <div className="mx-4 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{train.duration}</span>
                        </div>
                        <div className="relative mt-2 h-[2px] w-20 bg-gradient-to-r from-primary to-accent">
                          <div className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full bg-primary" />
                          <div className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-accent" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{getStationName(destination)}</p>
                        <p className="text-sm text-muted-foreground">{train.arrivalTime}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">Available Classes:</p>
                      <div className="flex flex-wrap gap-1">
                        {train.classes.map((cls) => (
                          <Badge key={cls} variant="outline" className="text-xs border-primary/30 text-primary">
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

                <CardFooter className="flex items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Starting from</span>
                    <span className="text-2xl font-bold gradient-text">{train.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10">
                      <Link href={`/railways/train/${train.id}`}>View Details</Link>
                    </Button>
                    <Button asChild className="indian-gradient text-white hover:opacity-90">
                      <Link href={`/railways/book?train=${train.id}`}>Book Now</Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
