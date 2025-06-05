 "use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CalendarDays, Clock, Search, Train, Sparkles } from "lucide-react"
import IndianEventsSearch from "@/components/indian-events-search"
import IndianRailwaySearch from "@/components/indian-railway-search"
import FeaturedIndianEvents from "@/components/featured-indian-events"
import PopularIndianRoutes from "@/components/popular-indian-routes"

const images = [
  "/Irctc.jpg",
  "/concert.jpg",
  "/event.jpg"
]

export default function Home() {
   const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-purple-600 via-blue-600 to-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        <div className="relative container grid gap-8 py-20 md:grid-cols-2 md:py-32">
          <div className="flex flex-col justify-center space-y-8 animate-slide-in">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-white/80">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">Discover • Book • Experience</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Your Gateway to
                <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  Events & Railways
                </span>
              </h1>
              <p className="max-w-[600px] text-lg text-white/90 md:text-xl leading-relaxed">
                Seamlessly discover amazing events and book railway tickets across India. Your journey starts here.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button asChild size="lg" className="event-button text-lg px-8 py-6">
                <Link href="/events" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Explore Events
                </Link>
              </Button>
              <Button asChild size="lg" className="train-button text-lg px-8 py-6">
                <Link href="/railways" className="flex items-center gap-2">
                  <Train className="h-5 w-5" />
                  Book Railways
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center transition-all duration-700">
            <Image
              src={images[current]}
              alt="Events and Railways"
              width={500}
              height={400}
              className="rounded-lg object-cover transition-opacity duration-1000"
              priority
            />
          
            
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What are you looking for?</h2>
            <p className="text-muted-foreground text-lg">Find events or book train tickets in just a few clicks</p>
          </div>

          <Tabs defaultValue="events" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 h-14 p-1 bg-white shadow-lg">
              <TabsTrigger
                value="events"
                className="flex items-center gap-3 text-base font-medium data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
              >
                <Calendar className="h-5 w-5" />
                <span>Find Events</span>
              </TabsTrigger>
              <TabsTrigger
                value="railways"
                className="flex items-center gap-3 text-base font-medium data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
              >
                <Train className="h-5 w-5" />
                <span>Book Railways</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="events" className="mt-8">
              <div className="glass-card rounded-2xl p-8">
                <IndianEventsSearch />
              </div>
            </TabsContent>
            <TabsContent value="railways" className="mt-8">
              <div className="glass-card rounded-2xl p-8">
                <IndianRailwaySearch />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Calendar className="h-8 w-8 text-purple-600" />
                Featured Events
              </h2>
              <p className="text-muted-foreground">Discover amazing events happening near you</p>
            </div>
            <Link href="/events">
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                View all events
              </Button>
            </Link>
          </div>
          <FeaturedIndianEvents />
        </div>
      </section>

      {/* Popular Railway Routes */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Train className="h-8 w-8 text-orange-600" />
                Popular Railway Routes
              </h2>
              <p className="text-muted-foreground">Book tickets for the most traveled routes</p>
            </div>
            <Link href="/railways">
              <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                View all routes
              </Button>
            </Link>
          </div>
          <PopularIndianRoutes />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Simple steps to discover events and book railway tickets</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                  <Search className="h-8 w-8" />
                </div>
                <CardTitle className="mt-6 text-xl">Search & Discover</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Find events or trains based on your preferences, location, and schedule with our smart search.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                  <CalendarDays className="h-8 w-8" />
                </div>
                <CardTitle className="mt-6 text-xl">Select & Compare</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Choose from events, festivals, or train options. Compare prices, timings, and amenities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
                  <Clock className="h-8 w-8" />
                </div>
                <CardTitle className="mt-6 text-xl">Book & Enjoy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Secure your tickets quickly and receive instant confirmation. Your journey awaits!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-400">10K+</div>
              <div className="text-gray-300">Events Listed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-400">500+</div>
              <div className="text-gray-300">Railway Routes</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">1M+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-400">50+</div>
              <div className="text-gray-300">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
