import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Star, Users, Ticket } from "lucide-react"

const featuredIndianEvents = [
  {
    id: "1",
    title: "Arijit Singh Live in Concert",
    image: "/placeholder.svg",
    date: "July 15, 2025",
    time: "7:00 PM",
    location: "NSCI Dome, Mumbai",
    category: "Music",
    price: "₹2,500",
    rating: 4.8,
    attendees: 1200,
  },
  {
    id: "2",
    title: "TechCrunch Startup Battlefield",
    image: "/placeholder.svg",
    date: "August 20, 2025",
    time: "9:00 AM",
    location: "Pragati Maidan, Delhi",
    category: "Technology",
    price: "₹5,000",
    rating: 4.6,
    attendees: 800,
  },
  {
    id: "3",
    title: "Diwali Cultural Festival",
    image: "/placeholder.svg",
    date: "October 25, 2025",
    time: "5:00 PM",
    location: "Palace Grounds, Bangalore",
    category: "Festival",
    price: "₹800",
    rating: 4.9,
    attendees: 2500,
  },
  {
    id: "4",
    title: "Zakir Khan Comedy Show",
    image: "/placeholder.svg",
    date: "September 10, 2025",
    time: "8:00 PM",
    location: "Phoenix MarketCity, Chennai",
    category: "Comedy",
    price: "₹1,200",
    rating: 4.7,
    attendees: 600,
  },
]

export default function FeaturedIndianEvents() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {featuredIndianEvents.map((event) => (
        <Card
          key={event.id}
          className="event-card group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              width={400}
              height={225}
              className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-500"
            />
            <div className="absolute top-3 right-3">
              <Badge className="bg-white/90 text-purple-700 border-0 shadow-md">{event.price}</Badge>
            </div>
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-purple-600 text-white border-0">
                {event.category}
              </Badge>
            </div>
          </div>

          <CardHeader className="p-4 pb-2">
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-purple-700 transition-colors">
              {event.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{event.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{event.attendees}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span>{event.date}</span>
                <Clock className="h-4 w-4 text-purple-600 ml-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-purple-600" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button asChild className="w-full event-button group-hover:shadow-lg transition-all">
              <Link href={`/events/${event.id}`} className="flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                View Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
