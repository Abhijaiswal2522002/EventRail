import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Train } from "lucide-react"

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
  },
]

export default function PopularIndianRoutes() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {popularIndianRoutes.map((route) => (
        <Card key={route.id} className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Train className="h-4 w-4" />
                <span className="font-medium text-sm">{route.trainName}</span>
              </div>
              <Badge variant="outline">{route.trainNumber}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="font-semibold">{route.source}</p>
                  <p className="text-muted-foreground">{route.departureTime}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-xs text-muted-foreground">{route.duration}</p>
                  <div className="relative mt-1 h-[2px] w-16 bg-muted">
                    <div className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full bg-foreground" />
                    <div className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-foreground" />
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold">{route.destination}</p>
                  <p className="text-muted-foreground">{route.arrivalTime}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-3 w-3" />
                  <span className="text-muted-foreground">Daily</span>
                </div>
                <div className="font-semibold">{route.price}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button asChild variant="outline" className="w-full">
              <Link href={`/railways/train/${route.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
