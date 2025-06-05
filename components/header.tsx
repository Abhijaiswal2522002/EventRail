"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Calendar, Menu, Train, User, LogOut, Sparkles } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, isLoggedIn, logout } = useAuth()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/events",
      label: "Events",
      active: pathname === "/events" || pathname.startsWith("/events/"),
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      href: "/railways",
      label: "Railways",
      active: pathname === "/railways" || pathname.startsWith("/railways/"),
      icon: Train,
      color: "text-orange-600",
    },
  ]

  if (isLoggedIn) {
    routes.push({
      href: "/profile",
      label: "Profile",
      active: pathname === "/profile" || pathname.startsWith("/profile/"),
      icon: User,
      color: "text-blue-600",
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="lg:hidden">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <Train className="h-5 w-5 text-orange-600" />
                    <Sparkles className="h-4 w-4 text-blue-500" />
                  </div>
                  <span className="bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                    EventRail
                  </span>
                </Link>
                <div className="grid gap-3">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "flex items-center gap-3 text-sm font-medium transition-colors",
                        route.active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {route.icon && <route.icon className={cn("h-4 w-4", route.color)} />}
                      {route.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <div className="flex items-center gap-1">
              <Calendar className="h-6 w-6 text-purple-600" />
              <Train className="h-6 w-6 text-orange-600" />
              <Sparkles className="h-4 w-4 text-blue-500" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
              EventRail
            </span>
          </Link>

          <nav className="hidden lg:flex lg:gap-8 lg:ml-8">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground",
                  route.active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {route.icon && <route.icon className={cn("h-4 w-4", route.color)} />}
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-orange-500 text-white font-semibold">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
