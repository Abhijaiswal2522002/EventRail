"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Train, Ticket, Settings, Download, LogIn } from "lucide-react"

// Mock user data
const userData = {
  name: "Rajesh Kumar",
  email: "rajesh.kumar@example.com",
  phone: "+91 98765 43210",
  avatar: "/placeholder.svg",
  memberSince: "January 2024",
  totalBookings: 15,
  upcomingEvents: 4,
  completedTrips: 12,
}

// Mock bookings data
const eventBookings = [
  {
    id: "e1",
    eventTitle: "Arijit Singh Live in Concert",
    date: "July 15, 2025",
    time: "7:00 PM",
    location: "NSCI Dome, Mumbai",
    ticketType: "Gold",
    price: "₹4,500",
    status: "confirmed",
    bookingId: "EVT-001234",
  },
  {
    id: "e2",
    eventTitle: "Diwali Cultural Festival",
    date: "October 25, 2025",
    time: "5:00 PM",
    location: "Palace Grounds, Bangalore",
    ticketType: "Family Pass",
    price: "₹800",
    status: "confirmed",
    bookingId: "EVT-001235",
  },
]

const railwayBookings = [
  {
    id: "r1",
    trainName: "Mumbai Rajdhani Express",
    trainNumber: "12951",
    source: "New Delhi",
    destination: "Mumbai Central",
    date: "August 20, 2025",
    departureTime: "4:55 PM",
    arrivalTime: "8:35 AM",
    class: "3A",
    seat: "B1-25",
    price: "₹3,500",
    status: "confirmed",
    pnr: "PNR123456789",
  },
  {
    id: "r2",
    trainName: "Tamil Nadu Express",
    trainNumber: "12621",
    source: "New Delhi",
    destination: "Chennai Central",
    date: "September 25, 2025",
    departureTime: "10:30 PM",
    arrivalTime: "7:40 AM",
    class: "2A",
    seat: "A1-15",
    price: "₹2,800",
    status: "confirmed",
    pnr: "PNR987654321",
  },
]

export default function ProfilePage() {
  const { user, isLoggedIn, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, isLoading, router])

  if (isLoading) {
    return (
      <div className="container flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="container flex min-h-[50vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <LogIn className="mx-auto h-12 w-12 text-muted-foreground" />
            <CardTitle>Login Required</CardTitle>
            <CardDescription>Please login to view your profile and bookings</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="w-full">
              <Link href="/login">Login to Continue</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback className="bg-gradient-to-r from-orange-100 to-green-100 text-orange-600 text-xl">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <p className="text-muted-foreground">{userData.email}</p>
              <p className="text-sm text-muted-foreground">Member since {userData.memberSince}</p>
            </div>
          </div>
          <Button asChild variant="outline">
            <Link href="/profile/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{userData.totalBookings}</div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{userData.upcomingEvents}</div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{userData.completedTrips}</div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">2,450</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Event Bookings
            </TabsTrigger>
            <TabsTrigger value="railways" className="flex items-center gap-2">
              <Train className="h-4 w-4" />
              Railway Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Event Bookings</h2>
                <Button asChild variant="outline" size="sm">
                  <Link href="/events">Browse Events</Link>
                </Button>
              </div>

              {eventBookings.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Event Bookings</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      You haven't booked any events yet. Discover amazing events happening near you!
                    </p>
                    <Button asChild>
                      <Link href="/events">Explore Events</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {eventBookings.map((booking) => (
                    <Card key={booking.id} className="border-orange-100">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{booking.eventTitle}</CardTitle>
                            <CardDescription>Booking ID: {booking.bookingId}</CardDescription>
                          </div>
                          <Badge
                            variant={booking.status === "confirmed" ? "default" : "secondary"}
                            className={booking.status === "confirmed" ? "bg-green-600" : ""}
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Ticket className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{booking.ticketType}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-lg font-semibold text-orange-600">{booking.price}</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Download Ticket
                            </Button>
                            <Button asChild size="sm">
                              <Link href={`/events/${booking.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="railways" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Railway Bookings</h2>
                <Button asChild variant="outline" size="sm">
                  <Link href="/railways">Book Railways</Link>
                </Button>
              </div>

              {railwayBookings.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Train className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Railway Bookings</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      You haven't booked any train tickets yet. Start planning your next journey!
                    </p>
                    <Button asChild>
                      <Link href="/railways">Book Railways</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {railwayBookings.map((booking) => (
                    <Card key={booking.id} className="border-green-100">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {booking.trainName} ({booking.trainNumber})
                            </CardTitle>
                            <CardDescription>PNR: {booking.pnr}</CardDescription>
                          </div>
                          <Badge
                            variant={booking.status === "confirmed" ? "default" : "secondary"}
                            className={booking.status === "confirmed" ? "bg-green-600" : ""}
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                          <div className="text-center">
                            <p className="font-semibold">{booking.source}</p>
                            <p className="text-sm text-muted-foreground">{booking.departureTime}</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="relative h-[2px] w-16 bg-gradient-to-r from-orange-400 to-green-400">
                              <div className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full bg-orange-500" />
                              <div className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-green-500" />
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold">{booking.destination}</p>
                            <p className="text-sm text-muted-foreground">{booking.arrivalTime}</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold">{booking.class}</p>
                            <p className="text-sm text-muted-foreground">Seat {booking.seat}</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold">{booking.date}</p>
                            <p className="text-sm text-muted-foreground">Journey Date</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-lg font-semibold text-green-600">{booking.price}</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Download Ticket
                            </Button>
                            <Button asChild size="sm">
                              <Link href={`/railways/train/${booking.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
