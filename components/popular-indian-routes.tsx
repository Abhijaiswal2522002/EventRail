import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Train, MapPin, Star, Zap } from "lucide-react"

const popularIndianRoutes = [
  {
    id: "1",
    source: "New Delhi",
    destination: "Mumbai Central",
    trainName: "Mumbai Rajdhani Express",
    trainNumber: "12951",
    departureTime: "4:55 PM",
    arrivalTime: "8:35 AM",
    duration: "15h 40m",
    price: "₹3,500",
    rating: 4.5,
    type: "Rajdhani",
  },
  {
    id: "2",
    source: "New Delhi",
    destination: "Howrah Junction",
    trainName: "Howrah Rajdhani Express",
    trainNumber: "12301",
    departureTime: "5:00 PM",
    arrivalTime: "10:05 AM",
    duration: "17h 05m",
    price: "₹3,200",
    rating: 4.3,
    type: "Rajdhani",
  },
  {
    id: "3",
    source: "New Delhi",
    destination: "Chennai Central",
    trainName: "Tamil Nadu Express",
    trainNumber: "12621",
    departureTime: "10:30 PM",
    arrivalTime: "7:40 AM",
    duration: "33h 10m",
    price: "₹2,800",
    rating: 4.2,
    type: "Express",
  },
  {
    id: "4",
    source: "Mumbai Central",
    destination: "Bangalore City",
    trainName: "Udyan Express",
    trainNumber: "11301",
    departureTime: "8:05 AM",
    arrivalTime: "10:40 PM",
    duration: "14h 35m",
    price: "₹1,800",
    rating: 4.1,
    type: "Express",
  },
]

export default function PopularIndianRoutes() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {popularIndianRoutes.map((route) => (
        <Card
          key={route.id}
          className="train-card group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Train className="h-5 w-5 text-orange-600" />
                <span className="font-bold text-sm">{route.trainName}</span>
              </div>
              <Badge className="bg-orange-600 text-white border-0">{route.type}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">{route.trainNumber}</span>
              <div className="flex items-center gap-1 ml-auto">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{route.rating}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="font-bold text-sm">{route.source}</p>
                  <p className="text-xs text-muted-foreground">{route.departureTime}</p>
                </div>
                <div className="flex flex-col items-center px-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Clock className="h-3 w-3" />
                    <span>{route.duration}</span>
                  </div>
                  <div className="relative h-[2px] w-16 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full">
                    <div className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full bg-orange-500" />
                    <div className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-yellow-500" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm">{route.destination}</p>
                  <p className="text-xs text-muted-foreground">{route.arrivalTime}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm">
                  <Zap className="h-4 w-4 text-orange-600" />
                  <span className="text-muted-foreground">Daily</span>
                </div>
                <div className="font-bold text-lg text-orange-600">{route.price}</div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button asChild className="w-full train-button group-hover:shadow-lg transition-all">
              <Link href={`/railways/train/${route.id}`} className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                View Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
