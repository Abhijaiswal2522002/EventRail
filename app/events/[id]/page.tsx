import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Share, Star, Ticket, User } from "lucide-react"

const event = {
  id: "1",
  title: "Arijit Singh Live in Concert",
  image: "/placeholder.svg",
  date: "July 15, 2025",
  time: "7:00 PM - 11:00 PM",
  location: "NSCI Dome, Mumbai",
  address: "Worli Sports Club, Dr. Annie Besant Road, Worli, Mumbai, Maharashtra 400018",
  category: "concert",
  organizer: "BookMyShow Live",
  description: `
    <p>Experience the magical voice of Arijit Singh live with his greatest hits from Bollywood movies.</p>
    <h3>What to Expect:</h3>
    <ul>
      <li>Live performance of hit songs</li>
      <li>Special acoustic sessions</li>
      <li>Interactive segments with the audience</li>
    </ul>
  `,
  ticketTiers: [
    {
      id: "t1",
      name: "Silver",
      price: 2500,
      description: "General seating area with good view of the stage",
      available: true,
    },
    {
      id: "t2",
      name: "Gold",
      price: 4500,
      description: "Premium seating with better view and complimentary refreshments",
      available: true,
    },
    {
      id: "t3",
      name: "Platinum",
      price: 7500,
      description: "VIP experience with meet & greet opportunity",
      available: false,
    },
  ],
  reviews: [
    {
      id: "r1",
      user: "Priya Sharma",
      rating: 5,
      comment: "Amazing concert! Great organization and venue.",
    },
    {
      id: "r2",
      user: "Rahul Gupta",
      rating: 4,
      comment: "Fantastic performance. Highly recommended!",
    },
  ],
}

export default function EventPage({ params }: { params: { id: string } }) {
  // Use params.id if needed for dynamic content
  console.log("Event ID:", params.id)
  return (
    <div className="container py-8">
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-10">
        <div className="lg:col-span-2">
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="capitalize">
                {event.category}
              </Badge>
              <Button variant="ghost" size="icon">
                <Share className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <div className="flex flex-col gap-2 text-muted-foreground sm:flex-row sm:gap-4">
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
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="mb-6 overflow-hidden rounded-lg">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              width={800}
              height={450}
              className="h-auto w-full object-cover"
            />
          </div>

          <Tabs defaultValue="details" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Organizer</h3>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{event.organizer}</p>
                    <p className="text-sm text-muted-foreground">Event Organizer</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="location" className="mt-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="mt-1 text-muted-foreground">{event.address}</p>
              </div>
              <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted">
                <div className="flex h-full w-full items-center justify-center">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Map view would appear here</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-5 w-5 ${star <= 4.5 ? "fill-current" : "text-muted"}`} />
                  ))}
                </div>
                <span className="font-medium">4.5</span>
                <span className="text-muted-foreground">({event.reviews.length} reviews)</span>
              </div>
              <div className="space-y-4">
                {event.reviews.map((review) => (
                  <div key={review.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="font-medium">{review.user}</div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= review.rating ? "fill-current" : "text-muted"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Book Tickets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {event.ticketTiers.map((tier) => (
                <div key={tier.id} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">{tier.name}</h3>
                    <span className="font-semibold">₹{tier.price.toLocaleString()}</span>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">{tier.description}</p>
                  <Button className="w-full" disabled={!tier.available}>
                    {tier.available ? (
                      <>
                        <Ticket className="mr-2 h-4 w-4" />
                        Book Tickets
                      </>
                    ) : (
                      "Sold Out"
                    )}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
