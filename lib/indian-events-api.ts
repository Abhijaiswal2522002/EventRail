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
    return this.transformEventResponse(response, params)
  }

  async getEventById(eventId: string): Promise<EventData | null> {
    try {
      const apiParams = {
        event_id: eventId,
      }

      const response = await this.makeRequest("", apiParams)

      if (response.data) {
        return this.transformSingleEvent(response.data as Record<string, unknown>)
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

  private transformEventResponse(response: unknown, params: EventSearchParams): EventAPIResponse {
    const events = (response as any).events_results || []

    return {
      events: events.map((event: any) => this.transformSingleEvent(event)).slice(0, params.limit || 20),
      total: events.length,
      page: params.page || 1,
      limit: params.limit || 20,
      hasMore: events.length > (params.limit || 20),
    }
  }

  private transformSingleEvent(event: Record<string, unknown>): EventData {
    // Handle the specific API response format you provided
    const startDateTime = new Date((event.start_time as string) || (event.start_time_utc as string))
    const endDateTime = new Date((event.end_time as string) || (event.end_time_utc as string))

    return {
      id: (event.event_id as string) || (event.id as string) || Math.random().toString(36),
      title: (event.name as string) || (event.title as string) || "Untitled Event",
      description: (event.description as string) || "",
      category: this.extractCategory((event.tags as string[]) || []),
      subcategory: (event.venue as any)?.subtype,
      date: startDateTime.toISOString().split("T")[0],
      startTime: startDateTime.toTimeString().substring(0, 5),
      endTime: endDateTime.toTimeString().substring(0, 5),
      timezone: (event.venue as any)?.timezone || "Asia/Kolkata",
      venue: {
        name: (event.venue as any)?.name || "TBD",
        address: (event.venue as any)?.full_address || "",
        city: (event.venue as any)?.city || "",
        state: (event.venue as any)?.state || "",
        country: this.mapCountryCode((event.venue as any)?.country) || "India",
        pincode: (event.venue as any)?.postal_code,
        coordinates:
          (event.venue as any)?.latitude && (event.venue as any)?.longitude
            ? {
                lat: Number.parseFloat((event.venue as any).latitude),
                lng: Number.parseFloat((event.venue as any).longitude),
              }
            : undefined,
        phone: (event.venue as any)?.phone_number,
        website: (event.venue as any)?.website,
        rating: (event.venue as any)?.rating,
        reviewCount: (event.venue as any)?.review_count,
      },
      organizer: {
        name: (event.publisher as string) || "Event Organizer",
        website: event.link as string,
      },
      images: (event.thumbnail ? [event.thumbnail] : []) as string[],
      ticketing: {
        available: Boolean((event.ticket_links as any)?.length),
        tiers: this.generateTicketTiers((event.ticket_links as any) || []),
        currency: "INR",
        bookingUrl: (event.ticket_links as any)?.[0]?.link,
        ticketLinks: (event.ticket_links as any) || [],
      },
      tags: (event.tags as string[]) || [],
      languages: [(event.language as string) || "en"],
      ageRestriction: this.extractAgeRestriction(event.description as string),
      status: "active",
      popularity: ((event.venue as any)?.review_count as number) || 100,
      rating: (event.venue as any)?.rating as number,
      reviewCount: (event.venue as any)?.review_count as number,
      isVirtual: (event.is_virtual as boolean) || false,
      publisher: event.publisher
        ? {
            name: event.publisher as string,
            domain: event.publisher_domain as string,
            favicon: event.publisher_favicon as string,
          }
        : undefined,
      infoLinks: (event.info_links as any) || [],
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

  private generateTicketTiers(ticketLinks: Array<{ source: string; link: string }>): TicketTierAPI[] {
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
  private getMockData(endpoint: string, params?: Record<string, unknown>): unknown {
    return {
      events_results: this.getMockEvents(params?.limit || 20),
      search_metadata: {
        status: "Success",
        total_results: 100,
      },
    }
  }

  private getMockEvents(limit: number): Record<string, unknown>[] {
    const mockEvents = [
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

export async function getPopularEvents(city?: string): Promise<EventData[]> {
  return eventsAPI.getPopularEvents(city)
}

export async function getUpcomingEvents(city?: string): Promise<EventData[]> {
  return eventsAPI.getUpcomingEvents(city)
}

export async function getEventsByLocation(lat: number, lng: number, radius?: number): Promise<EventData[]> {
  return eventsAPI.getEventsByLocation(lat, lng, radius)
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
