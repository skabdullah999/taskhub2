"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, CreditCard, FileText, Home, LogOut, Menu, MessageSquare, PlusCircle, Settings, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AdBanner } from "@/components/ad-banner"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Determine if user is worker or advertiser based on URL
  const isAdvertiser = pathname.includes("/dashboard/advertiser")
  const userType = isAdvertiser ? "advertiser" : "worker"

  const workerNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/jobs", label: "Available Jobs", icon: FileText },
    { href: "/dashboard/my-tasks", label: "My Tasks", icon: FileText },
    { href: "/dashboard/wallet", label: "Wallet", icon: CreditCard },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  const advertiserNavItems = [
    { href: "/dashboard/advertiser", label: "Dashboard", icon: Home },
    { href: "/dashboard/advertiser/create-job", label: "Create Job", icon: PlusCircle },
    { href: "/dashboard/advertiser/my-jobs", label: "My Jobs", icon: FileText },
    { href: "/dashboard/advertiser/wallet", label: "Wallet", icon: CreditCard },
    { href: "/dashboard/advertiser/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/advertiser/settings", label: "Settings", icon: Settings },
  ]

  const navItems = isAdvertiser ? advertiserNavItems : workerNavItems

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 sm:max-w-sm">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                      <span className="text-xl font-bold">TaskHub</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 px-2">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground capitalize">{userType}</p>
                    </div>
                  </div>
                  <Separator />
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item, index) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={index}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      )
                    })}
                  </nav>
                  <Separator />
                  <Button variant="ghost" className="flex items-center justify-start gap-3 px-3">
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center md:hidden">
              <span className="text-xl font-bold">TaskHub</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-background md:block">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b px-6">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold">TaskHub</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
              <nav className="grid gap-2 px-4">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                        isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-6 flex justify-center px-4">
                <AdBanner variant="vertical" position="sidebar" />
              </div>
            </div>
            <div className="border-t p-4">
              <div className="flex items-center gap-4 px-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground capitalize">{userType}</p>
                </div>
              </div>
              <Separator className="my-4" />
              <Button variant="ghost" className="w-full justify-start gap-3">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="mb-6">
              <AdBanner variant="horizontal" position="content" />
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
