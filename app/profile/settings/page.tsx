"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon, Clock, ImagePlus, MapPin, ArrowLeft, Sparkles } from "lucide-react"

export default function CreateEventPage() {
  const router = useRouter()
  const { user, isLoggedIn } = useAuth()
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ticketTiers, setTicketTiers] = useState([{ name: "General Admission", price: "", description: "" }])

  // Redirect if not logged in
  if (!isLoggedIn) {
    router.push("/login")
    return null
  }

  const addTicketTier = () => {
    setTicketTiers([...ticketTiers, { name: "", price: "", description: "" }])
  }

  const removeTicketTier = (index: number) => {
    setTicketTiers(ticketTiers.filter((_, i) => i !== index))
  }

  const updateTicketTier = (index: number, field: string, value: string) => {
    const updatedTiers = [...ticketTiers]
    updatedTiers[index] = { ...updatedTiers[index], [field]: value }
    setTicketTiers(updatedTiers)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show success message and redirect
    alert("Event created successfully!")
    router.push("/events")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-orange-500">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                Create Amazing Event
              </h1>
              <p className="text-gray-600 mt-2">Share your passion with the world</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Basic Information */}
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                  <CardDescription className="text-purple-100">Tell us about your event</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-700 font-medium">
                      Event Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter an exciting event title"
                      required
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-gray-700 font-medium">
                      Category *
                    </Label>
                    <Select required>
                      <SelectTrigger id="category" className="border-purple-200 focus:border-purple-500">
                        <SelectValue placeholder="Select event category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concert">🎵 Concert</SelectItem>
                        <SelectItem value="conference">💼 Conference</SelectItem>
                        <SelectItem value="exhibition">🎨 Exhibition</SelectItem>
                        <SelectItem value="workshop">🛠️ Workshop</SelectItem>
                        <SelectItem value="sports">⚽ Sports</SelectItem>
                        <SelectItem value="festival">🎉 Festival</SelectItem>
                        <SelectItem value="other">📋 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-700 font-medium">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what makes your event special..."
                      className="min-h-[120px] border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time */}
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Date & Time
                  </CardTitle>
                  <CardDescription className="text-orange-100">When will your event take place?</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">Event Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal border-orange-200 hover:border-orange-500",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-orange-500" />
                            {date ? format(date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startTime" className="text-gray-700 font-medium">
                        Start Time *
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                        <Input
                          id="startTime"
                          type="time"
                          className="pl-9 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime" className="text-gray-700 font-medium">
                        End Time *
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                        <Input
                          id="endTime"
                          type="time"
                          className="pl-9 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location
                  </CardTitle>
                  <CardDescription className="text-blue-100">Where will your event take place?</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="venueName" className="text-gray-700 font-medium">
                      Venue Name *
                    </Label>
                    <Input
                      id="venueName"
                      placeholder="Enter venue name"
                      required
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-700 font-medium">
                      Address *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                      <Input
                        id="address"
                        placeholder="Enter full address"
                        className="pl-9 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-gray-700 font-medium">
                        City *
                      </Label>
                      <Input
                        id="city"
                        placeholder="City"
                        required
                        className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-gray-700 font-medium">
                        State *
                      </Label>
                      <Input
                        id="state"
                        placeholder="State"
                        required
                        className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-gray-700 font-medium">
                        Zip Code *
                      </Label>
                      <Input
                        id="zipCode"
                        placeholder="Zip Code"
                        required
                        className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Image */}
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <ImagePlus className="h-5 w-5" />
                    Event Image
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Upload an attractive image for your event
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-green-300 bg-green-50 p-8 transition-colors hover:border-green-400 hover:bg-green-100">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-4 rounded-full bg-green-100">
                        <ImagePlus className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-green-700">Drag & drop or click to upload</p>
                        <p className="text-sm text-green-600">Recommended size: 1200 x 675 pixels (16:9 ratio)</p>
                        <p className="text-xs text-green-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                      <Input id="eventImage" type="file" className="hidden" accept="image/*" />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("eventImage")?.click()}
                        className="border-green-500 text-green-600 hover:bg-green-50"
                      >
                        Choose File
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Information */}
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">🎫</span>
                    Ticket Information
                  </CardTitle>
                  <CardDescription className="text-purple-100">Set up ticket types and pricing</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {ticketTiers.map((tier, index) => (
                    <div key={index} className="space-y-4 rounded-lg border border-purple-200 bg-purple-50/50 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-purple-700">Ticket Tier {index + 1}</h3>
                        {ticketTiers.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTicketTier(index)}
                            className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                          >
                            ×
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor={`tierName-${index}`} className="text-gray-700 font-medium">
                            Ticket Name *
                          </Label>
                          <Input
                            id={`tierName-${index}`}
                            placeholder="e.g., General Admission"
                            value={tier.name}
                            onChange={(e) => updateTicketTier(index, "name", e.target.value)}
                            required
                            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`tierPrice-${index}`} className="text-gray-700 font-medium">
                            Price (₹) *
                          </Label>
                          <Input
                            id={`tierPrice-${index}`}
                            type="number"
                            placeholder="0.00"
                            value={tier.price}
                            onChange={(e) => updateTicketTier(index, "price", e.target.value)}
                            required
                            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`tierDescription-${index}`} className="text-gray-700 font-medium">
                            Description
                          </Label>
                          <Input
                            id={`tierDescription-${index}`}
                            placeholder="Brief description"
                            value={tier.description}
                            onChange={(e) => updateTicketTier(index, "description", e.target.value)}
                            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTicketTier}
                    className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    + Add Another Ticket Tier
                  </Button>
                </CardContent>
              </Card>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white font-semibold py-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating Event...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Create Event
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                  className="px-8 border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
