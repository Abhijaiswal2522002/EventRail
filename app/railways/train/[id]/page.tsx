import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Train, Wifi, Coffee, Utensils, Calendar, ArrowLeft, Ticket } from "lucide-react"

const train = {
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
  type: "Rajdhani",
  frequency: "Daily",
  classes: [
    {
      name: "1A",
      fullName: "First AC",
      price: 5500,
      totalSeats: 18,
      availableSeats: 12,
      amenities: ["AC", "Meals", "Bedding", "Charging Point"],
    },
    {
      name: "2A",
      fullName: "Second AC",
      price: 4200,
      totalSeats: 46,
      availableSeats: 28,
      amenities: ["AC", "Meals", "Bedding", "Charging Point"],
    },
    {
      name: "3A",
      fullName: "Third AC",
      price: 3500,
      totalSeats: 64,
      availableSeats: 45,
      amenities: ["AC", "Meals", "Bedding"],
    },
  ],
  amenities: ["wifi", "food", "coffee"],
  route: [
    { station: "New Delhi", code: "NDLS", arrival: "Start", departure: "4:55 PM", day: 1 },
    { station: "Mathura Junction", code: "MTJ", arrival: "6:28 PM", departure: "6:30 PM", day: 1 },
    { station: "Agra Cantt", code: "AGC", arrival: "7:23 PM", departure: "7:25 PM", day: 1 },
    { station: "Jhansi Junction", code: "JHS", arrival: "9:43 PM", departure: "9:48 PM", day: 1 },
    { station: "Bhopal Junction", code: "BPL", arrival: "12:55 AM", departure: "1:00 AM", day: 2 },
    { station: "Nagpur Junction", code: "NGP", arrival: "5:15 AM", departure: "5:25 AM", day: 2 },
    { station: "Mumbai Central", code: "BCT", arrival: "8:35 AM", departure: "End", day: 2 },
  ],
  features: [
    "Pantry Car Available",
    "On-board Catering",
    "Charging Points",
    "Reading Lights",
    "Clean Washrooms",
    "Security Personnel",
  ],
}

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

export default function TrainDetailsPage({ params }: { params: { id: string } }) {
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
            <h1 className="text-3xl font-bold">{train.trainName}</h1>
            <p className="text-muted-foreground">Train No: {train.trainNumber}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Train className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{train.trainName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{train.trainNumber}</p>
                    </div>
                  </div>
                  <Badge>{train.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <p className="font-bold text-lg">{train.source}</p>
                    <p className="text-sm text-muted-foreground">{train.sourceCode}</p>
                    <p className="font-semibold">{train.departureTime}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <span>{train.duration}</span>
                    </div>
                    <div className="relative h-[2px] w-20 bg-muted">
                      <div className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full bg-foreground" />
                      <div className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{train.distance}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">{train.destination}</p>
                    <p className="text-sm text-muted-foreground">{train.destinationCode}</p>
                    <p className="font-semibold">{train.arrivalTime}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{train.frequency}</span>
                  </div>
                  <div className="flex gap-2">
                    {train.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-1">
                        {getAmenityIcon(amenity)}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="classes" className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="classes">Classes & Fare</TabsTrigger>
                <TabsTrigger value="route">Route & Schedule</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
              </TabsList>
              <TabsContent value="classes" className="mt-4">
                <div className="space-y-4">
                  {train.classes.map((cls) => (
                    <Card key={cls.name}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">
                              {cls.fullName} ({cls.name})
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {cls.availableSeats} seats available out of {cls.totalSeats}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {cls.amenities.map((amenity) => (
                                <Badge key={amenity} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">₹{cls.price.toLocaleString()}</p>
                            <Button className="mt-2" disabled={cls.availableSeats === 0}>
                              {cls.availableSeats > 0 ? "Book Now" : "Waitlist"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="route" className="mt-4">
                <div className="space-y-4">
                  {train.route.map((stop, index) => (
                    <div key={stop.code} className="flex items-center gap-4 p-4 rounded-lg border">
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-3 w-3 rounded-full ${index === 0 || index === train.route.length - 1 ? "bg-foreground" : "bg-muted-foreground"}`}
                        />
                        {index < train.route.length - 1 && <div className="h-8 w-[2px] bg-muted mt-1" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{stop.station}</p>
                            <p className="text-sm text-muted-foreground">{stop.code}</p>
                          </div>
                          <div className="text-right text-sm">
                            <p>
                              <strong>Arr:</strong> {stop.arrival}
                            </p>
                            <p>
                              <strong>Dep:</strong> {stop.departure}
                            </p>
                            <Badge variant="outline" className="mt-1">
                              Day {stop.day}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="amenities" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {train.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className="h-2 w-2 rounded-full bg-foreground" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Quick Book</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                  <p className="text-2xl font-bold">
                    ₹{Math.min(...train.classes.map((c) => c.price)).toLocaleString()}
                  </p>
                </div>
                {train.classes.map((cls) => (
                  <Button key={cls.name} className="w-full justify-between" disabled={cls.availableSeats === 0}>
                    <span>
                      {cls.name} - ₹{cls.price.toLocaleString()}
                    </span>
                    <Ticket className="h-4 w-4" />
                  </Button>
                ))}
                <div className="text-center text-xs text-muted-foreground">
                  <p>Prices are subject to change</p>
                  <p>Additional charges may apply</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
