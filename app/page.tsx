import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CalendarDays, Clock, Search, Train } from "lucide-react"
import IndianEventsSearch from "@/components/indian-events-search"
import IndianRailwaySearch from "@/components/indian-railway-search"
import FeaturedIndianEvents from "@/components/featured-indian-events"
import PopularIndianRoutes from "@/components/popular-indian-routes"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="bg-muted/50">
        <div className="container grid gap-8 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Discover Events & Book Railway Tickets
              </h1>
              <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                Your one-stop platform for finding events and booking railway tickets across India.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/events">Explore Events</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/railways">Book Railways</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Events and Railways"
              width={500}
              height={400}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container">
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Find Events</span>
            </TabsTrigger>
            <TabsTrigger value="railways" className="flex items-center gap-2">
              <Train className="h-4 w-4" />
              <span>Book Railways</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="events" className="mt-4">
            <IndianEventsSearch />
          </TabsContent>
          <TabsContent value="railways" className="mt-4">
            <IndianRailwaySearch />
          </TabsContent>
        </Tabs>
      </section>

      {/* Featured Events Section */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Featured Events</h2>
          <Link href="/events" className="text-sm font-medium hover:underline">
            View all events
          </Link>
        </div>
        <FeaturedIndianEvents />
      </section>

      {/* Popular Railway Routes */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Popular Railway Routes</h2>
          <Link href="/railways" className="text-sm font-medium hover:underline">
            View all routes
          </Link>
        </div>
        <PopularIndianRoutes />
      </section>

      {/* How It Works */}
      <section className="bg-muted/50">
        <div className="container py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight">How It Works</h2>
            <p className="mt-2 text-muted-foreground">Simple steps to discover events and book railway tickets</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Search className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Search</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find events or trains based on your preferences, location, and schedule.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Select</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose from events, festivals, or train options that match your criteria.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Book</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Secure your tickets quickly and receive instant confirmation.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
