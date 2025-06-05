"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, Star, IndianRupee } from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  category: string
  date: string
  startTime: string
  venue: {
    name: string
    city: string
    state: string
  }
  ticketing: {
    tiers: Array<{
      name: string
      price: number
    }>
  }
  images: string[]
  rating?: number
  popularity: number
}

export default function IndianEventsSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")
  const [selectedDate, setSelectedDate] = useState(searchParams.get("date") || "")

  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad"]
  const categories = ["Music", "Technology", "Food & Drink", "Arts & Culture", "Sports", "Business"]

  useEffect(() => {
    searchEvents()
  }, [searchParams])

  const searchEvents = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append("q", searchQuery)
      if (selectedCity) params.append("city", selectedCity)
      if (selectedCategory) params.append("category", selectedCategory)
      if (selectedDate) params.append("date", selectedDate)

      const response = await fetch(`/api/events/search?${params.toString()}`)
      const result = await response.json()

      if (result.success) {
        setEvents(result.data.events)
      } else {
        console.error("Failed to fetch events:", result.error)
        setEvents([])
      }
    } catch (error) {
      console.error("Error searching events:", error)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.append("q", searchQuery)
    if (selectedCity) params.append("city", selectedCity)
    if (selectedCategory) params.append("category", selectedCategory)
    if (selectedDate) params.append("date", selectedDate)

    router.push(`/events?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCity("")
    setSelectedCategory("")
    setSelectedDate("")
    router.push("/events")
  }

  const getMinPrice = (event: Event) => {
    if (!event.ticketing.tiers.length) return 0
    return Math.min(...event.ticketing.tiers.map((tier) => tier.price))
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lg:col-span-2"
            />

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search Events"}
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCity || selectedCategory || selectedDate) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchQuery && <Badge variant="secondary">Search: {searchQuery}</Badge>}
              {selectedCity && <Badge variant="secondary">City: {selectedCity}</Badge>}
              {selectedCategory && <Badge variant="secondary">Category: {selectedCategory}</Badge>}
              {selectedDate && <Badge variant="secondary">Date: {new Date(selectedDate).toLocaleDateString()}</Badge>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Searching events...</p>
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-0">
                {event.images.length > 0 && (
                  <img
                    src={event.images[0] || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2">{event.title}</h3>
                    {event.rating && (
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{event.rating}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{event.startTime}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {event.venue.name}, {event.venue.city}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{event.popularity} interested</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
                      <span className="font-semibold">
                        {getMinPrice(event) === 0 ? "Free" : `₹${getMinPrice(event)}+`}
                      </span>
                    </div>

                    <Badge variant="outline">{event.category}</Badge>
                  </div>

                  <Button className="w-full mt-4" onClick={() => router.push(`/events/${event.id}`)}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-600">No events found matching your criteria.</p>
            <Button variant="outline" onClick={clearFilters} className="mt-4">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
