import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"

const featuredIndianEvents = [
  {
    id: "1",
    title: "Arijit Singh Live in Concert",
    image: "/placeholder.svg",
    date: "July 15, 2025",
    time: "7:00 PM",
    location: "NSCI Dome, Mumbai",
    category: "concert",
    price: "₹2,500",
  },
  {
    id: "2",
    title: "TechCrunch Startup Battlefield",
    image: "/placeholder.svg",
    date: "August 20, 2025",
    time: "9:00 AM",
    location: "Pragati Maidan, Delhi",
    category: "conference",
    price: "₹5,000",
  },
  {
    id: "3",
    title: "Diwali Cultural Festival",
    image: "/placeholder.svg",
    date: "October 25, 2025",
    time: "5:00 PM",
    location: "Palace Grounds, Bangalore",
    category: "festival",
    price: "₹800",
  },
  {
    id: "4",
    title: "Zakir Khan Comedy Show",
    image: "/placeholder.svg",
    date: "September 10, 2025",
    time: "8:00 PM",
    location: "Phoenix MarketCity, Chennai",
    category: "comedy",
    price: "₹1,200",
  },
]

export default function FeaturedIndianEvents() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {featuredIndianEvents.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`} className="group">
          <Card className="overflow-hidden transition-all hover:shadow-md">
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
                <Badge variant="outline" className="ml-2 shrink-0">
                  {event.price}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Badge variant="secondary" className="capitalize">
                {event.category}
              </Badge>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
