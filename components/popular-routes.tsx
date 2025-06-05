import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Train } from "lucide-react"

// Mock data for popular railway routes
const popularRoutes = [
  {
    id: "1",
    source: "New York",
    destination: "Washington DC",
    trainName: "Northeast Express",
    trainNumber: "NE-101",
    departureTime: "08:30 AM",
    arrivalTime: "11:45 AM",
    duration: "3h 15m",
    price: "$65",
  },
  {
    id: "2",
    source: "Chicago",
    destination: "St. Louis",
    trainName: "Midwest Connector",
    trainNumber: "MW-205",
    departureTime: "10:15 AM",
    arrivalTime: "02:30 PM",
    duration: "4h 15m",
    price: "$55",
  },
  {
    id: "3",
    source: "Los Angeles",
    destination: "San Francisco",
    trainName: "Coast Starlight",
    trainNumber: "CS-303",
    departureTime: "07:00 AM",
    arrivalTime: "03:45 PM",
    duration: "8h 45m",
    price: "$89",
  },
  {
    id: "4",
    source: "Boston",
    destination: "Philadelphia",
    trainName: "Liberty Line",
    trainNumber: "LL-404",
    departureTime: "09:45 AM",
    arrivalTime: "01:30 PM",
    duration: "3h 45m",
    price: "$72",
  },
]

export default function PopularRoutes() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {popularRoutes.map((route) => (
        <Card key={route.id} className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Train className="h-4 w-4 text-primary" />
                <span className="font-medium">{route.trainName}</span>
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
                    <div className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full bg-primary" />
                    <div className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-primary" />
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
