export interface IndianEvent {
  id: string
  title: string
  description: string
  category: IndianEventCategory
  date: Date
  startTime: string
  endTime: string
  location: {
    venueName: string
    address: string
    city: string
    state: string
    pincode: string
    landmark?: string
  }
  organizer: string
  image?: string
  ticketTiers: TicketTier[]
  status: "draft" | "published" | "cancelled"
  tags: string[]
  language?: string[]
  ageRestriction?: string
  createdAt: Date
  updatedAt: Date
}

export type IndianEventCategory =
  | "bollywood-concert"
  | "classical-music"
  | "folk-dance"
  | "comedy-show"
  | "tech-conference"
  | "startup-meetup"
  | "cultural-festival"
  | "food-festival"
  | "art-exhibition"
  | "theater"
  | "sports"
  | "religious"
  | "educational"
  | "wedding"
  | "corporate"

export interface TicketTier {
  id: string
  name: string
  price: number
  description: string
  quantity: number
  sold: number
  benefits?: string[]
}

// Indian cities with popular venues
export const indianCities = [
  {
    name: "Mumbai",
    state: "Maharashtra",
    venues: ["NSCI Dome", "Jio Garden", "Phoenix Marketcity", "Nehru Centre", "Tata Theatre"],
  },
  {
    name: "Delhi",
    state: "Delhi",
    venues: ["Jawaharlal Nehru Stadium", "Pragati Maidan", "India Habitat Centre", "Siri Fort Auditorium", "Red Fort"],
  },
  {
    name: "Bangalore",
    state: "Karnataka",
    venues: ["Palace Grounds", "UB City Mall", "Chowdiah Memorial Hall", "Kanteerava Stadium", "Forum Mall"],
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    venues: ["Music Academy", "Phoenix MarketCity", "Nehru Stadium", "Express Avenue", "Kalaivanar Arangam"],
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    venues: [
      "Hitex Exhibition Centre",
      "Shilpakala Vedika",
      "GMC Balayogi Stadium",
      "Forum Sujana Mall",
      "Ravindra Bharathi",
    ],
  },
  {
    name: "Pune",
    state: "Maharashtra",
    venues: [
      "Shree Shaniwar Wada",
      "Phoenix Marketcity",
      "Bal Gandharva Rang Mandir",
      "Pune University",
      "Balewadi Stadium",
    ],
  },
  {
    name: "Kolkata",
    state: "West Bengal",
    venues: ["Netaji Indoor Stadium", "Rabindra Sadan", "Science City", "Salt Lake Stadium", "Academy of Fine Arts"],
  },
  {
    name: "Ahmedabad",
    state: "Gujarat",
    venues: ["Narendra Modi Stadium", "Gujarat University", "Tagore Hall", "Alpha One Mall", "Sabarmati Ashram"],
  },
]

// Sample Indian events data
export const sampleIndianEvents: IndianEvent[] = [
  {
    id: "1",
    title: "Arijit Singh Live in Concert",
    description: "Experience the magical voice of Arijit Singh live with his greatest hits from Bollywood movies.",
    category: "bollywood-concert",
    date: new Date("2025-07-15"),
    startTime: "19:00",
    endTime: "22:00",
    location: {
      venueName: "NSCI Dome",
      address: "Worli Sports Club, Dr. Annie Besant Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400018",
      landmark: "Near Worli Sea Link",
    },
    organizer: "BookMyShow Live",
    ticketTiers: [
      {
        id: "t1",
        name: "Silver",
        price: 2500,
        description: "General seating area",
        quantity: 2000,
        sold: 450,
        benefits: ["Entry to venue", "Parking"],
      },
      {
        id: "t2",
        name: "Gold",
        price: 4500,
        description: "Premium seating with better view",
        quantity: 800,
        sold: 200,
        benefits: ["Premium seating", "Complimentary snacks", "Parking"],
      },
      {
        id: "t3",
        name: "Platinum",
        price: 7500,
        description: "VIP experience with meet & greet",
        quantity: 200,
        sold: 50,
        benefits: ["VIP seating", "Meet & greet", "Signed merchandise", "Premium F&B"],
      },
    ],
    status: "published",
    tags: ["music", "bollywood", "live-concert", "arijit-singh"],
    language: ["Hindi", "Bengali"],
    ageRestriction: "All ages welcome",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "TechCrunch Startup Battlefield India",
    description: "India's biggest startup competition featuring innovative startups pitching to top investors.",
    category: "tech-conference",
    date: new Date("2025-08-20"),
    startTime: "09:00",
    endTime: "18:00",
    location: {
      venueName: "Pragati Maidan",
      address: "Mathura Road, Pragati Maidan",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      landmark: "Near India Gate",
    },
    organizer: "TechCrunch India",
    ticketTiers: [
      {
        id: "t1",
        name: "Student Pass",
        price: 1500,
        description: "For students with valid ID",
        quantity: 500,
        sold: 120,
        benefits: ["Full day access", "Networking lunch", "Startup kit"],
      },
      {
        id: "t2",
        name: "Professional Pass",
        price: 5000,
        description: "For working professionals",
        quantity: 1000,
        sold: 300,
        benefits: ["Full day access", "Networking sessions", "Premium lunch", "Startup directory"],
      },
      {
        id: "t3",
        name: "Investor Pass",
        price: 15000,
        description: "Exclusive access for investors",
        quantity: 100,
        sold: 25,
        benefits: ["VIP access", "Private investor lounge", "One-on-one meetings", "Premium networking"],
      },
    ],
    status: "published",
    tags: ["technology", "startup", "entrepreneurship", "investors"],
    language: ["English", "Hindi"],
    ageRestriction: "18+",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Diwali Cultural Festival",
    description: "Celebrate the festival of lights with traditional dance, music, food, and fireworks display.",
    category: "cultural-festival",
    date: new Date("2025-10-25"),
    startTime: "17:00",
    endTime: "23:00",
    location: {
      venueName: "Palace Grounds",
      address: "Jayamahal Road, Palace Grounds",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560080",
      landmark: "Near Cantonment Railway Station",
    },
    organizer: "Karnataka Cultural Association",
    ticketTiers: [
      {
        id: "t1",
        name: "Family Pass",
        price: 800,
        description: "Entry for family of 4",
        quantity: 1500,
        sold: 400,
        benefits: ["Entry for 4 people", "Traditional snacks", "Cultural program"],
      },
      {
        id: "t2",
        name: "Premium Experience",
        price: 1500,
        description: "Premium seating with dinner",
        quantity: 500,
        sold: 150,
        benefits: ["Premium seating", "Traditional dinner", "Cultural performances", "Fireworks view"],
      },
    ],
    status: "published",
    tags: ["diwali", "cultural", "traditional", "family", "festival"],
    language: ["Kannada", "Hindi", "English"],
    ageRestriction: "All ages welcome",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Zakir Khan Comedy Show",
    description:
      "Get ready to laugh out loud with India's favorite comedian Zakir Khan and his hilarious storytelling.",
    category: "comedy-show",
    date: new Date("2025-09-10"),
    startTime: "20:00",
    endTime: "22:30",
    location: {
      venueName: "Phoenix MarketCity",
      address: "Velachery Main Road, Velachery",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600042",
      landmark: "Near Velachery Railway Station",
    },
    organizer: "Paytm Insider",
    ticketTiers: [
      {
        id: "t1",
        name: "Regular",
        price: 1200,
        description: "Standard seating",
        quantity: 800,
        sold: 200,
        benefits: ["Entry to show", "Parking"],
      },
      {
        id: "t2",
        name: "Premium",
        price: 2000,
        description: "Front row seating",
        quantity: 200,
        sold: 80,
        benefits: ["Premium seating", "Meet & greet opportunity", "Signed poster"],
      },
    ],
    status: "published",
    tags: ["comedy", "standup", "zakir-khan", "hindi", "entertainment"],
    language: ["Hindi", "English"],
    ageRestriction: "16+",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "Classical Carnatic Music Concert",
    description: "An evening of soulful Carnatic music featuring renowned artists from South India.",
    category: "classical-music",
    date: new Date("2025-06-30"),
    startTime: "18:30",
    endTime: "21:30",
    location: {
      venueName: "Music Academy",
      address: "TTK Road, Alwarpet",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600018",
      landmark: "Near Luz Corner",
    },
    organizer: "Chennai Music Academy",
    ticketTiers: [
      {
        id: "t1",
        name: "General",
        price: 500,
        description: "General admission",
        quantity: 1000,
        sold: 300,
        benefits: ["Entry to concert", "Program notes"],
      },
      {
        id: "t2",
        name: "Patron",
        price: 1500,
        description: "Reserved seating for patrons",
        quantity: 200,
        sold: 75,
        benefits: ["Reserved seating", "Refreshments", "Artist interaction"],
      },
    ],
    status: "published",
    tags: ["classical", "carnatic", "music", "traditional", "south-indian"],
    language: ["Tamil", "Sanskrit"],
    ageRestriction: "All ages welcome",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Event categories with descriptions
export const indianEventCategories = [
  {
    id: "bollywood-concert",
    name: "Bollywood Concert",
    description: "Live performances by Bollywood singers and musicians",
    icon: "🎤",
  },
  {
    id: "classical-music",
    name: "Classical Music",
    description: "Traditional Indian classical music concerts",
    icon: "🎵",
  },
  {
    id: "folk-dance",
    name: "Folk Dance",
    description: "Traditional folk dance performances from different states",
    icon: "💃",
  },
  {
    id: "comedy-show",
    name: "Comedy Show",
    description: "Stand-up comedy and humor shows",
    icon: "😂",
  },
  {
    id: "tech-conference",
    name: "Tech Conference",
    description: "Technology conferences and seminars",
    icon: "💻",
  },
  {
    id: "startup-meetup",
    name: "Startup Meetup",
    description: "Entrepreneurship and startup networking events",
    icon: "🚀",
  },
  {
    id: "cultural-festival",
    name: "Cultural Festival",
    description: "Traditional festivals and cultural celebrations",
    icon: "🎭",
  },
  {
    id: "food-festival",
    name: "Food Festival",
    description: "Culinary events and food tastings",
    icon: "🍛",
  },
  {
    id: "art-exhibition",
    name: "Art Exhibition",
    description: "Art galleries and exhibitions",
    icon: "🎨",
  },
  {
    id: "theater",
    name: "Theater",
    description: "Drama and theatrical performances",
    icon: "🎭",
  },
  {
    id: "sports",
    name: "Sports",
    description: "Sports events and tournaments",
    icon: "⚽",
  },
  {
    id: "religious",
    name: "Religious",
    description: "Religious gatherings and spiritual events",
    icon: "🕉️",
  },
]

// Popular Indian festivals and their typical dates
export const indianFestivals = [
  {
    name: "Diwali",
    description: "Festival of Lights",
    typicalMonth: "October/November",
    regions: ["All India"],
  },
  {
    name: "Holi",
    description: "Festival of Colors",
    typicalMonth: "March",
    regions: ["North India", "Central India"],
  },
  {
    name: "Durga Puja",
    description: "Worship of Goddess Durga",
    typicalMonth: "September/October",
    regions: ["West Bengal", "Assam", "Odisha"],
  },
  {
    name: "Ganesh Chaturthi",
    description: "Lord Ganesha Festival",
    typicalMonth: "August/September",
    regions: ["Maharashtra", "Karnataka", "Andhra Pradesh"],
  },
  {
    name: "Navratri",
    description: "Nine Nights Festival",
    typicalMonth: "September/October",
    regions: ["Gujarat", "Rajasthan", "Maharashtra"],
  },
  {
    name: "Onam",
    description: "Harvest Festival of Kerala",
    typicalMonth: "August/September",
    regions: ["Kerala"],
  },
  {
    name: "Pongal",
    description: "Tamil Harvest Festival",
    typicalMonth: "January",
    regions: ["Tamil Nadu"],
  },
  {
    name: "Karva Chauth",
    description: "Festival for married women",
    typicalMonth: "October/November",
    regions: ["North India"],
  },
]
