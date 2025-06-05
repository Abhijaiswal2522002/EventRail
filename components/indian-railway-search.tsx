"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandList, CommandGroup, CommandInput, CommandItem, CommandEmpty } from "@/components/ui/command"
import { CalendarIcon, Search, Train, ArrowLeftRight } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Station {
  station_code: string
  station_name: string
  state_code: string
}

export default function IndianRailwaySearch() {
  const router = useRouter()
  const [fromStation, setFromStation] = useState("")
  const [toStation, setToStation] = useState("")
  const [journeyDate, setJourneyDate] = useState<Date>()
  const [stations, setStations] = useState<Station[]>([])
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Mock stations data for demo
    setStations([
      { station_code: "NDLS", station_name: "New Delhi", state_code: "DL" },
      { station_code: "BCT", station_name: "Mumbai Central", state_code: "MH" },
      { station_code: "MAS", station_name: "Chennai Central", state_code: "TN" },
      { station_code: "HWH", station_name: "Howrah Junction", state_code: "WB" },
      { station_code: "BLR", station_name: "Bangalore City", state_code: "KA" },
      { station_code: "PUNE", station_name: "Pune Junction", state_code: "MH" },
      { station_code: "ADI", station_name: "Ahmedabad Junction", state_code: "GJ" },
      { station_code: "JP", station_name: "Jaipur Junction", state_code: "RJ" },
      { station_code: "LKO", station_name: "Lucknow Charbagh", state_code: "UP" },
      { station_code: "BBS", station_name: "Bhubaneswar", state_code: "OR" },
    ])
  }, [])

  const handleSearch = async () => {
    if (!fromStation || !toStation || !journeyDate) {
      alert("Please fill all fields")
      return
    }

    setIsLoading(true)

    try {
      const params = new URLSearchParams({
        from: fromStation,
        to: toStation,
        date: format(journeyDate, "yyyy-MM-dd"),
      })

      router.push(`/railways/results?${params.toString()}`)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const swapStations = () => {
    const temp = fromStation
    setFromStation(toStation)
    setToStation(temp)
  }

  const getStationDisplay = (stationCode: string) => {
    const station = stations.find((s) => s.station_code === stationCode)
    return station ? `${station.station_name} (${station.station_code})` : "Select station..."
  }

  return (
    <div className="space-y-6 rounded-xl border bg-gradient-to-br from-accent/5 via-green-50 to-primary/5 p-6 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-accent to-primary">
          <Train className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-xl font-bold gradient-text">Indian Railway Booking</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-5 md:items-end">
        {/* From Station */}
        <div className="space-y-2">
          <Label htmlFor="from" className="font-semibold">
            From Station
          </Label>
          <Popover open={fromOpen} onOpenChange={setFromOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={fromOpen}
                className="w-full justify-between border-accent/20 focus:border-accent"
              >
                <span className="truncate">{getStationDisplay(fromStation)}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search station..." />
                <CommandList>
                  <CommandEmpty>No station found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {stations.map((station) => (
                      <CommandItem
                        key={station.station_code}
                        value={station.station_code}
                        onSelect={(currentValue) => {
                          setFromStation(currentValue === fromStation ? "" : currentValue)
                          setFromOpen(false)
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{station.station_name}</span>
                          <span className="text-sm text-muted-foreground">
                            {station.station_code} - {station.state_code}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={swapStations}
            className="rounded-full hover:bg-primary/10 border border-primary/20"
          >
            <ArrowLeftRight className="h-4 w-4 text-primary" />
          </Button>
        </div>

        {/* To Station */}
        <div className="space-y-2">
          <Label htmlFor="to" className="font-semibold">
            To Station
          </Label>
          <Popover open={toOpen} onOpenChange={setToOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={toOpen}
                className="w-full justify-between border-accent/20 focus:border-accent"
              >
                <span className="truncate">{getStationDisplay(toStation)}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search station..." />
                <CommandList>
                  <CommandEmpty>No station found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {stations.map((station) => (
                      <CommandItem
                        key={station.station_code}
                        value={station.station_code}
                        onSelect={(currentValue) => {
                          setToStation(currentValue === toStation ? "" : currentValue)
                          setToOpen(false)
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{station.station_name}</span>
                          <span className="text-sm text-muted-foreground">
                            {station.station_code} - {station.state_code}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Journey Date */}
        <div className="space-y-2">
          <Label className="font-semibold">Journey Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-accent/20 focus:border-accent",
                  !journeyDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {journeyDate ? format(journeyDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={journeyDate}
                onSelect={setJourneyDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          disabled={isLoading}
          className="indian-gradient hover:opacity-90 text-white font-semibold"
        >
          {isLoading ? (
            "Searching..."
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search Trains
            </>
          )}
        </Button>
      </div>

      {/* Quick Links */}
      <div className="space-y-3">
        <span className="text-sm font-semibold text-gray-700">🚄 Popular Routes:</span>
        <div className="flex flex-wrap gap-2">
          {[
            { from: "NDLS", to: "BCT", label: "Delhi → Mumbai" },
            { from: "NDLS", to: "MAS", label: "Delhi → Chennai" },
            { from: "BCT", to: "BLR", label: "Mumbai → Bangalore" },
            { from: "HWH", to: "NDLS", label: "Kolkata → Delhi" },
          ].map((route) => (
            <Button
              key={`${route.from}-${route.to}`}
              variant="outline"
              size="sm"
              onClick={() => {
                setFromStation(route.from)
                setToStation(route.to)
              }}
              className="text-xs border-accent/30 hover:bg-accent/10 hover:border-accent"
            >
              {route.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
