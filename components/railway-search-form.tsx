"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Search, Train } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function RailwaySearchForm() {
  const router = useRouter()
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (source) params.append("source", source)
    if (destination) params.append("destination", destination)
    if (date) params.append("date", format(date, "yyyy-MM-dd"))

    router.push(`/railways/results?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-4">
      <div className="relative">
        <Train className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="From (Source Station)"
          className="pl-9"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />
      </div>

      <div className="relative">
        <Train className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="To (Destination Station)"
          className="pl-9"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
      </div>

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Journey Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit" className="flex items-center gap-2">
        <Search className="h-4 w-4" />
        <span>Search Trains</span>
      </Button>
    </form>
  )
}
