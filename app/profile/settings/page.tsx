"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Bell, Shield, CreditCard, Camera, Save, Trash2, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Form states
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "+91 98765 43210",
    bio: "Travel enthusiast and event lover",
    location: "Mumbai, India",
    dateOfBirth: "1990-01-01",
  })

  const [notifications, setNotifications] = useState({
    emailEvents: true,
    emailRailway: true,
    pushEvents: false,
    pushRailway: true,
    smsBookings: true,
    marketingEmails: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    dataSharing: false,
  })

  // Redirect if not logged in
  if (!isLoggedIn) {
    router.push("/login")
    return null
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Profile updated successfully!")
    setIsLoading(false)
  }

  const handleSaveNotifications = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Notification preferences updated!")
    setIsLoading(false)
  }

  const handleSavePrivacy = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Privacy settings updated!")
    setIsLoading(false)
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      logout()
      router.push("/")
    }
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
              Back to Profile
            </Button>

            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                Account Settings
              </h1>
              <p className="text-gray-600 mt-2">Manage your account preferences and privacy</p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Billing
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    Update your personal information and profile picture
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                      <AvatarFallback className="bg-gradient-to-r from-purple-100 to-orange-100 text-purple-600 text-2xl">
                        User
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" className="mb-2">
                        <Camera className="mr-2 h-4 w-4" />
                        Change Photo
                      </Button>
                      <p className="text-sm text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Form Fields */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="border-purple-200 focus:border-purple-500"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  >
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription className="text-orange-100">
                    Choose how you want to be notified about events and bookings
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="emailEvents">Event Updates</Label>
                            <p className="text-sm text-gray-500">Get notified about new events and updates</p>
                          </div>
                          <Switch
                            id="emailEvents"
                            checked={notifications.emailEvents}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, emailEvents: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="emailRailway">Railway Bookings</Label>
                            <p className="text-sm text-gray-500">Updates about your train bookings</p>
                          </div>
                          <Switch
                            id="emailRailway"
                            checked={notifications.emailRailway}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, emailRailway: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="marketingEmails">Marketing Emails</Label>
                            <p className="text-sm text-gray-500">Promotional offers and newsletters</p>
                          </div>
                          <Switch
                            id="marketingEmails"
                            checked={notifications.marketingEmails}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, marketingEmails: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="pushEvents">Event Reminders</Label>
                            <p className="text-sm text-gray-500">Reminders about upcoming events</p>
                          </div>
                          <Switch
                            id="pushEvents"
                            checked={notifications.pushEvents}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, pushEvents: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="pushRailway">Travel Alerts</Label>
                            <p className="text-sm text-gray-500">Important updates about your journeys</p>
                          </div>
                          <Switch
                            id="pushRailway"
                            checked={notifications.pushRailway}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, pushRailway: checked })}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">SMS Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="smsBookings">Booking Confirmations</Label>
                            <p className="text-sm text-gray-500">SMS confirmations for bookings</p>
                          </div>
                          <Switch
                            id="smsBookings"
                            checked={notifications.smsBookings}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, smsBookings: checked })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleSaveNotifications}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                  >
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Control your privacy settings and account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Profile Visibility</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="profileVisible">Public Profile</Label>
                            <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                          </div>
                          <Switch
                            id="profileVisible"
                            checked={privacy.profileVisible}
                            onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="showEmail">Show Email</Label>
                            <p className="text-sm text-gray-500">Display email on your public profile</p>
                          </div>
                          <Switch
                            id="showEmail"
                            checked={privacy.showEmail}
                            onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="showPhone">Show Phone</Label>
                            <p className="text-sm text-gray-500">Display phone number on your profile</p>
                          </div>
                          <Switch
                            id="showPhone"
                            checked={privacy.showPhone}
                            onCheckedChange={(checked) => setPrivacy({ ...privacy, showPhone: checked })}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Data & Analytics</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="dataSharing">Data Sharing</Label>
                            <p className="text-sm text-gray-500">Allow sharing anonymized data for analytics</p>
                          </div>
                          <Switch
                            id="dataSharing"
                            checked={privacy.dataSharing}
                            onCheckedChange={(checked) => setPrivacy({ ...privacy, dataSharing: checked })}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Password & Security</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter current password"
                              className="border-blue-200 focus:border-blue-500 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            className="border-blue-200 focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            className="border-blue-200 focus:border-blue-500"
                          />
                        </div>

                        <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleSavePrivacy}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Settings
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Billing & Payments
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Manage your payment methods and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="text-center py-12">
                    <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Payment Methods</h3>
                    <p className="text-gray-500 mb-6">No payment methods added yet</p>
                    <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                      Add Payment Method
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
                    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-red-800">Delete Account</h4>
                          <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                        </div>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteAccount}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
