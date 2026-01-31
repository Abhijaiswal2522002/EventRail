// Indian Events API Integration
export interface EventAPIResponse {
  events: EventData[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface EventData {
  id: string
  title: string
  description: string
  category: string
  subcategory?: string
  date: string
  startTime: string
  endTime: string
  timezone: string
  venue: {
    name: string
    address: string
    city: string
    state: string
    country: string
    pincode?: string
    coordinates?: {
      lat: number
      lng: number
    }
    phone?: string
    website?: string
    rating?: number
    reviewCount?: number
  }
  organizer: {
    name: string
    email?: string
    phone?: string
    website?: string
  }
  images: string[]
  ticketing: {
    available: boolean
    tiers: TicketTierAPI[]
    currency: string
    bookingUrl?: string
    ticketLinks: Array<{
      source: string
      link: string
    }>
  }
  tags: string[]
  languages: string[]
  ageRestriction?: string
  status: "active" | "cancelled" | "postponed" | "sold_out"
  popularity: number
  rating?: number
  reviewCount?: number
  isVirtual: boolean
  publisher?: {
    name: string
    domain: string
    favicon?: string
  }
  infoLinks: Array<{
    source: string
    link: string
  }>
  createdAt: string
  updatedAt: string
}

export interface TicketTierAPI {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  totalQuantity: number
  availableQuantity: number
  benefits: string[]
  saleStartDate?: string
  saleEndDate?: string
}

export interface EventSearchParams {
  query?: string
  city?: string
  state?: string
  category?: string
  subcategory?: string
  date?: string
  dateRange?: {
    start: string
    end: string
  }
  priceRange?: {
    min: number
    max: number
  }
  language?: string
  tags?: string[]
  sortBy?: "date" | "popularity" | "price" | "rating"
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number
  lat?: number
  lng?: number
  radius?: number
}

interface EventVenue {
  name: string
  full_address?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
  latitude?: string | number
  longitude?: string | number
  timezone?: string
  phone_number?: string
  website?: string
  rating?: number
  review_count?: number
  subtype?: string
}

interface TicketLink {
  source: string
  link: string
}

interface InfoLink {
  source: string
  link: string
}

interface EventResponseData {
  event_id?: string
  id?: string
  name?: string
  title?: string
  description?: string
  start_time?: string
  start_time_utc?: string
  end_time?: string
  end_time_utc?: string
  venue?: EventVenue
  tags?: string[]
  language?: string
  thumbnail?: string
  ticket_links?: TicketLink[]
  info_links?: InfoLink[]
  publisher?: string
  publisher_domain?: string
  publisher_favicon?: string
  is_virtual?: boolean
  link?: string
  data?: Record<string, unknown>
}

interface EventsAPIResponse {
  events_results?: EventResponseData[]
  search_metadata?: {
    status: string
    total_results: number
  }
  data?: EventResponseData
}

class IndianEventsAPI {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = process.env.EVENTS_API_BASE_URL || "https://serpapi.com/search"
    this.apiKey = process.env.EVENTS_API_KEY || ""
  }

  private async makeRequest(endpoint: string, params?: Record<string, unknown>): Promise<unknown> {
    try {
      const url = new URL(this.baseUrl)

      // Add default parameters for the events API
      const defaultParams = {
        engine: "google_events",
        api_key: this.apiKey,
        hl: "en",
        gl: "in", // India
      }

      const allParams = { ...defaultParams, ...params }

      Object.entries(allParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })

      const response = await fetch(url.toString(), {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Events API request failed:", error)
      // Fallback to mock data in development or when API fails
      return this.getMockData(endpoint, params)
    }
  }

  async searchEvents(params: EventSearchParams): Promise<EventAPIResponse> {
    const apiParams: Record<string, unknown> = {
      q: params.query || "events",
    }

    // Add location parameters
    if (params.city) {
      apiParams.q += ` in ${params.city}`
    }
    if (params.state) {
      apiParams.q += ` ${params.state}`
    }

    // Add category to search query
    if (params.category) {
      apiParams.q += ` ${params.category}`
    }

    // Add date parameters
    if (params.date) {
      apiParams.start_date = params.date
    }
    if (params.dateRange?.start) {
      apiParams.start_date = params.dateRange.start
    }
    if (params.dateRange?.end) {
      apiParams.end_date = params.dateRange.end
    }

    // Add location coordinates if provided
    if (params.lat && params.lng) {
      apiParams.ll = `@${params.lat},${params.lng},15z`
    }

    const response = await this.makeRequest("", apiParams)
    return this.transformEventResponse(response as EventsAPIResponse, params)
  }

  async getEventById(eventId: string): Promise<EventData | null> {
    try {
      const apiParams = {
        event_id: eventId,
      }

      const response = await this.makeRequest("", apiParams)

      if ((response as EventsAPIResponse).data) {
        return this.transformSingleEvent((response as EventsAPIResponse).data as EventResponseData)
      }

      return this.getMockEventById(eventId)
    } catch (error) {
      console.error(`Failed to fetch event ${eventId}:`, error)
      return this.getMockEventById(eventId)
    }
  }

  async getEventsByCategory(category: string, city?: string, limit = 10): Promise<EventData[]> {
    const response = await this.searchEvents({
      category,
      city,
      limit,
    })
    return response.events
  }

  async getPopularEvents(city?: string, limit = 10): Promise<EventData[]> {
    const response = await this.searchEvents({
      city,
      limit,
      sortBy: "popularity",
      sortOrder: "desc",
    })
    return response.events
  }

  async getUpcomingEvents(city?: string, limit = 10): Promise<EventData[]> {
    const today = new Date().toISOString().split("T")[0]
    const response = await this.searchEvents({
      city,
      limit,
      date: today,
      sortBy: "date",
      sortOrder: "asc",
    })
    return response.events
  }

  async getEventsByLocation(lat: number, lng: number, radius = 50, limit = 10): Promise<EventData[]> {
    const response = await this.searchEvents({
      lat,
      lng,
      radius,
      limit,
    })
    return response.events
  }

  private transformEventResponse(response: EventsAPIResponse, params: EventSearchParams): EventAPIResponse {
    const events = response.events_results || []

    return {
      events: events.map((event) => this.transformSingleEvent(event)).slice(0, params.limit || 20),
      total: events.length,
      page: params.page || 1,
      limit: params.limit || 20,
      hasMore: events.length > (params.limit || 20),
    }
  }

  private transformSingleEvent(event: EventResponseData): EventData {
    // Handle the specific API response format you provided
    const startDateTime = new Date(event.start_time || event.start_time_utc || new Date().toISOString())
    const endDateTime = new Date(event.end_time || event.end_time_utc || new Date().toISOString())
    const venue = event.venue || ({} as Partial<EventVenue>)

    return {
      id: event.event_id || event.id || Math.random().toString(36),
      title: event.name || event.title || "Untitled Event",
      description: event.description || "",
      category: this.extractCategory(event.tags || []),
      subcategory: venue.subtype,
      date: startDateTime.toISOString().split("T")[0],
      startTime: startDateTime.toTimeString().substring(0, 5),
      endTime: endDateTime.toTimeString().substring(0, 5),
      timezone: venue.timezone || "Asia/Kolkata",
      venue: {
        name: venue.name || "TBD",
        address: venue.full_address || "",
        city: venue.city || "",
        state: venue.state || "",
        country: this.mapCountryCode(venue.country || "") || "India",
        pincode: venue.postal_code,
        coordinates:
          venue.latitude && venue.longitude
            ? {
              lat: Number.parseFloat(String(venue.latitude)),
              lng: Number.parseFloat(String(venue.longitude)),
            }
            : undefined,
        phone: venue.phone_number,
        website: venue.website,
        rating: venue.rating,
        reviewCount: venue.review_count,
      },
      organizer: {
        name: event.publisher || "Event Organizer",
        website: event.link || "",
      },
      images: event.thumbnail ? [event.thumbnail] : [],
      ticketing: {
        available: Boolean(event.ticket_links?.length),
        tiers: this.generateTicketTiers(event.ticket_links || []),
        currency: "INR",
        bookingUrl: event.ticket_links?.[0]?.link,
        ticketLinks: event.ticket_links || [],
      },
      tags: event.tags || [],
      languages: [event.language || "en"],
      ageRestriction: this.extractAgeRestriction(event.description || ""),
      status: "active",
      popularity: venue.review_count || 100,
      rating: venue.rating,
      reviewCount: venue.review_count,
      isVirtual: Boolean(event.is_virtual),
      publisher: event.publisher
        ? {
          name: event.publisher,
          domain: event.publisher_domain || "",
          favicon: event.publisher_favicon || "",
        }
        : undefined,
      infoLinks: event.info_links || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  private extractCategory(tags: string[]): string {
    const categoryMap: Record<string, string> = {
      concert: "Music",
      music: "Music",
      show: "Entertainment",
      festival: "Festival",
      conference: "Business",
      workshop: "Education",
      sports: "Sports",
      food: "Food & Drink",
      art: "Arts & Culture",
      technology: "Technology",
    }

    for (const tag of tags) {
      const category = categoryMap[tag.toLowerCase()]
      if (category) return category
    }

    return "General"
  }

  private mapCountryCode(countryCode: string): string {
    const countryMap: Record<string, string> = {
      US: "United States",
      IN: "India",
      UK: "United Kingdom",
      CA: "Canada",
      AU: "Australia",
    }

    return countryMap[countryCode] || countryCode
  }

  private extractAgeRestriction(description: string): string | undefined {
    if (!description) return undefined

    const ageMatches = description.match(/(\d+)\+/)
    if (ageMatches) {
      return `${ageMatches[1]}+ only`
    }

    if (description.toLowerCase().includes("all ages")) {
      return "All ages welcome"
    }

    return undefined
  }

  private generateTicketTiers(ticketLinks: TicketLink[]): TicketTierAPI[] {
    if (!ticketLinks.length) return []

    // Generate realistic ticket tiers based on available sources
    const tiers: TicketTierAPI[] = []

    if (ticketLinks.length > 0) {
      tiers.push({
        id: "general",
        name: "General Admission",
        price: 1500,
        description: "Standard entry to the event",
        totalQuantity: 500,
        availableQuantity: 450,
        benefits: ["Event entry", "General seating"],
      })
    }

    if (ticketLinks.length > 1) {
      tiers.push({
        id: "premium",
        name: "Premium",
        price: 2500,
        description: "Enhanced experience with better seating",
        totalQuantity: 200,
        availableQuantity: 180,
        benefits: ["Event entry", "Premium seating", "Complimentary drink"],
      })
    }

    return tiers
  }

  // Mock data methods for development and fallback
  private getMockData(endpoint: string, params?: Record<string, unknown>): EventsAPIResponse {
    return {
      events_results: this.getMockEvents(Number(params?.limit) || 20),
      search_metadata: {
        status: "Success",
        total_results: 100,
      },
    }
  }

  private getMockEvents(limit: number): EventResponseData[] {
    const mockEvents: EventResponseData[] = [
      {
        event_id: "mock-1",
        name: "Arijit Singh Live Concert",
        description: "Experience the magical voice of Arijit Singh live with his greatest hits from Bollywood movies.",
        start_time: "2025-07-15T19:00:00",
        end_time: "2025-07-15T22:00:00",
        venue: {
          name: "NSCI Dome",
          full_address: "Worli Sports Club, Dr. Annie Besant Road, Worli, Mumbai, Maharashtra 400018",
          city: "Mumbai",
          state: "Maharashtra",
          country: "IN",
          latitude: 19.0176,
          longitude: 72.8562,
          timezone: "Asia/Kolkata",
          rating: 4.2,
          review_count: 1250,
        },
        tags: ["concert", "music", "bollywood"],
        language: "hi",
        thumbnail: "/placeholder.svg",
        ticket_links: [
          { source: "BookMyShow", link: "https://bookmyshow.com/mumbai/events/arijit-singh-live" },
          { source: "Paytm Insider", link: "https://insider.in/arijit-singh-mumbai" },
        ],
        info_links: [{ source: "Official Website", link: "https://arijitsingh.com" }],
        publisher: "BookMyShow",
        publisher_domain: "bookmyshow.com",
        is_virtual: false,
      },
      {
        event_id: "mock-2",
        name: "Sunburn Festival 2025",
        description: "India's biggest electronic dance music festival featuring international and local DJs.",
        start_time: "2025-12-28T16:00:00",
        end_time: "2025-12-30T02:00:00",
        venue: {
          name: "Vagator Beach",
          full_address: "Vagator Beach, North Goa, Goa 403509",
          city: "Goa",
          state: "Goa",
          country: "IN",
          latitude: 15.6014,
          longitude: 73.7442,
          timezone: "Asia/Kolkata",
          rating: 4.5,
          review_count: 2500,
        },
        tags: ["festival", "music", "edm"],
        language: "en",
        thumbnail: "/placeholder.svg",
        ticket_links: [
          { source: "BookMyShow", link: "https://bookmyshow.com/goa/events/sunburn-festival" },
          { source: "Zomato Live", link: "https://zomato.com/events/sunburn-goa" },
        ],
        info_links: [{ source: "Official Website", link: "https://sunburn.in" }],
        publisher: "Sunburn",
        publisher_domain: "sunburn.in",
        is_virtual: false,
      },
    ]

    return mockEvents.slice(0, limit)
  }

  private getMockEventById(eventId: string): EventData | null {
    const mockEvents = this.getMockEvents(10)
    const mockEvent = mockEvents.find((e) => e.event_id === eventId) || mockEvents[0]
    return mockEvent ? this.transformSingleEvent(mockEvent) : null
  }
}

// Export singleton instance
export const eventsAPI = new IndianEventsAPI()

// Export utility functions
export async function searchEvents(params: EventSearchParams): Promise<EventAPIResponse> {
  return eventsAPI.searchEvents(params)
}

export async function getEventById(eventId: string): Promise<EventData | null> {
  return eventsAPI.getEventById(eventId)
}

export async function getPopularEvents(city?: string, limit?: number): Promise<EventData[]> {
  return eventsAPI.getPopularEvents(city, limit || 10)
}

export async function getUpcomingEvents(city?: string, limit?: number): Promise<EventData[]> {
  return eventsAPI.getUpcomingEvents(city, limit || 10)
}

export async function getEventsByLocation(
  lat: number,
  lng: number,
  radius?: number,
  limit?: number,
): Promise<EventData[]> {
  return eventsAPI.getEventsByLocation(lat, lng, radius, limit || 10)
}

// Export utility function for categories
export async function getEventCategories(): Promise<string[]> {
  return [
    "Music",
    "Technology",
    "Food & Drink",
    "Arts & Culture",
    "Sports",
    "Business",
    "Festival",
    "Entertainment",
    "Education",
  ]
}
