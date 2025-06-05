"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Search, Tag, Globe } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { indianEventCategories, indianCities } from "@/lib/indian-events-data"

export default function IndianEventsSearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [city, setCity] = useState("")
  const [category, setCategory] = useState("")
  const [language, setLanguage] = useState("")
  const [date, setDate] = useState<Date>()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.append("q", searchQuery)
    if (city) params.append("city", city)
    if (category) params.append("category", category)
    if (language) params.append("language", language)
    if (date) params.append("date", format(date, "yyyy-MM-dd"))

    router.push(`/events?${params.toString()}`)
  }

  const indianLanguages = [
    "Hindi",
    "English",
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Bengali",
    "Marathi",
    "Gujarati",
    "Punjabi",
    "Urdu",
    "Sanskrit",
  ]

  return (
    <div className="space-y-6 rounded-xl border bg-gradient-to-br from-primary/5 via-yellow-50 to-accent/5 p-6 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent">
          <Tag className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-xl font-bold gradient-text">Discover Indian Events</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-6">
        {/* Search Query */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-9 border-primary/20 focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* City */}
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="pl-9 border-primary/20 focus:border-primary">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {indianCities.map((cityData) => (
                <SelectItem key={cityData.name} value={cityData.name}>
                  {cityData.name}, {cityData.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="relative">
          <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="pl-9 border-primary/20 focus:border-primary">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {indianEventCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Language */}
        <div className="relative">
          <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="pl-9 border-primary/20 focus:border-primary">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {indianLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-primary/20 focus:border-primary",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <Button onClick={handleSearch} className="indian-gradient hover:opacity-90 text-white font-semibold">
          <Search className="mr-2 h-4 w-4" />
          Search Events
        </Button>
      </div>

      {/* Festival Quick Links */}
      <div className="space-y-3">
        <span className="text-sm font-semibold text-gray-700">🎭 Upcoming Festivals:</span>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Diwali", emoji: "🪔", category: "cultural-festival" },
            { name: "Holi", emoji: "🎨", category: "cultural-festival" },
            { name: "Navratri", emoji: "💃", category: "folk-dance" },
            { name: "Durga Puja", emoji: "🙏", category: "cultural-festival" },
            { name: "Ganesh Chaturthi", emoji: "🐘", category: "cultural-festival" },
            { name: "Onam", emoji: "🌺", category: "cultural-festival" },
          ].map((festival) => (
            <Button
              key={festival.name}
              variant="outline"
              size="sm"
              onClick={() => {
                setCategory(festival.category)
                setSearchQuery(festival.name)
              }}
              className="text-xs border-primary/30 hover:bg-primary/10 hover:border-primary"
            >
              {festival.emoji} {festival.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
