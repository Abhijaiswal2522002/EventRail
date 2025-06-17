"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Filter, MapPin, Plus, Globe } from "lucide-react"
import IndianEventsSearch from "@/components/indian-events-search"

// Indian events data
const allIndianEvents = [
  {
    id: "1",
    title: "Arijit Singh Live in Concert",
    image: "/placeholder.svg",
    date: "July 15, 2025",
    time: "7:00 PM",
    location: "NSCI Dome, Mumbai, Maharashtra",
    city: "Mumbai",
    category: "bollywood-concert",
    price: "₹2,500",
    description: "Experience the magical voice of Arijit Singh live with his greatest hits from Bollywood movies.",
    language: ["Hindi", "Bengali"],
  },
  {
    id: "2",
    title: "TechCrunch Startup Battlefield India",
    image: "/placeholder.svg",
    date: "August 20, 2025",
    time: "9:00 AM",
    location: "Pragati Maidan, Delhi",
    city: "Delhi",
    category: "tech-conference",
    price: "₹5,000",
    description: "India's biggest startup competition featuring innovative startups pitching to top investors.",
    language: ["English", "Hindi"],
  },
  {
    id: "3",
    title: "Diwali Cultural Festival",
    image: "/placeholder.svg",
    date: "October 25, 2025",
    time: "5:00 PM",
    location: "Palace Grounds, Bangalore, Karnataka",
    city: "Bangalore",
    category: "cultural-festival",
    price: "₹800",
    description: "Celebrate the festival of lights with traditional dance, music, food, and fireworks display.",
    language: ["Kannada", "Hindi", "English"],
  },
  {
    id: "4",
    title: "Zakir Khan Comedy Show",
    image: "/placeholder.svg",
    date: "September 10, 2025",
    time: "8:00 PM",
    location: "Phoenix MarketCity, Chennai, Tamil Nadu",
    city: "Chennai",
    category: "comedy-show",
    price: "₹1,200",
    description:
      "Get ready to laugh out loud with India's favorite comedian Zakir Khan and his hilarious storytelling.",
    language: ["Hindi", "English"],
  },
  {
    id: "5",
    title: "Classical Carnatic Music Concert",
    image: "/placeholder.svg",
    date: "June 30, 2025",
    time: "6:30 PM",
    location: "Music Academy, Chennai, Tamil Nadu",
    city: "Chennai",
    category: "classical-music",
    price: "₹500",
    description: "An evening of soulful Carnatic music featuring renowned artists from South India.",
    language: ["Tamil", "Sanskrit"],
  },
  {
    id: "6",
    title: "Navratri Garba Festival",
    image: "/placeholder.svg",
    date: "September 15, 2025",
    time: "7:00 PM",
    location: "Tagore Hall, Ahmedabad, Gujarat",
    city: "Ahmedabad",
    category: "folk-dance",
    price: "₹300",
    description: "Join the vibrant Navratri celebrations with traditional Garba and Dandiya dance.",
    language: ["Gujarati", "Hindi"],
  },
  {
    id: "7",
    title: "Bangalore Food Festival",
    image: "/placeholder.svg",
    date: "August 5, 2025",
    time: "12:00 PM",
    location: "UB City Mall, Bangalore, Karnataka",
    city: "Bangalore",
    category: "food-festival",
    price: "₹600",
    description: "Taste the best of South Indian cuisine and street food from across Karnataka.",
    language: ["Kannada", "English"],
  },
  {
    id: "8",
    title: "Rabindra Sangeet Evening",
    image: "/placeholder.svg",
    date: "July 20, 2025",
    time: "6:00 PM",
    location: "Rabindra Sadan, Kolkata, West Bengal",
    city: "Kolkata",
    category: "classical-music",
    price: "₹400",
    description: "An evening dedicated to the timeless songs of Rabindranath Tagore.",
    language: ["Bengali", "English"],
  },
]

export default function EventsPage() {
  const searchParams = useSearchParams()
  const [filteredEvents, setFilteredEvents] = useState(allIndianEvents)

  useEffect(() => {
    const query = searchParams.get("q")
    const city = searchParams.get("city")
    const category = searchParams.get("category")
    const language = searchParams.get("language")
    const date = searchParams.get("date")

    let filtered = allIndianEvents

    if (query) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query.toLowerCase()) ||
          event.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (city) {
      filtered = filtered.filter((event) => event.city.toLowerCase().includes(city.toLowerCase()))
    }

    if (category) {
      filtered = filtered.filter((event) => event.category === category)
    }

    if (language) {
      filtered = filtered.filter((event) =>
        event.language.some((lang) => lang.toLowerCase().includes(language.toLowerCase())),
      )
    }

    if (date) {
      // Simple date filtering - in real app, you'd parse and compare dates properly
      filtered = filtered.filter((event) => event.date.includes(date))
    }

    setFilteredEvents(filtered)
  }, [searchParams])

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold gradient-text">Indian Events</h1>
          <p className="text-muted-foreground text-lg">
            Discover and book tickets for cultural events, festivals, and entertainment across India
          </p>
        </div>

        <div className="rounded-xl border shadow-lg">
          <IndianEventsSearch />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Showing {filteredEvents.length} events</span>
           {searchParams.get("q") && (
  <Badge variant="outline" className="border-primary text-primary">
    {`Search: "${searchParams.get("q")}"`}
  </Badge>
)}

            {searchParams.get("city") && (
              <Badge variant="outline" className="border-primary text-primary">
                City: {searchParams.get("city")}
              </Badge>
            )}
            {searchParams.get("category") && (
              <Badge variant="outline" className="border-primary text-primary">
                Category: {searchParams.get("category")?.replace("-", " ")}
              </Badge>
            )}
          </div>
          <Button asChild className="indian-gradient text-white">
            <Link href="/events/create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Create Event</span>
            </Link>
          </Button>
        </div>

        {filteredEvents.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria or browse all events</p>
            <Button asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`} className="group">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-primary/20">
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      width={400}
                      height={225}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold line-clamp-2">{event.title}</h3>
                      <Badge variant="outline" className="ml-2 shrink-0 border-primary text-primary">
                        {event.price}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <span className="line-clamp-1">{event.language.join(", ")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Badge
                      variant="secondary"
                      className="capitalize bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20"
                    >
                      {event.category.replace("-", " ")}
                    </Badge>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
