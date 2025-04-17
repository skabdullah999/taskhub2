"use client"

import { useState } from "react"
import { ExternalLink, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface AdBannerProps {
  variant?: "horizontal" | "vertical" | "square"
  position?: "sidebar" | "content" | "footer"
  className?: string
}

export function AdBanner({ variant = "horizontal", position = "content", className = "" }: AdBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) {
    return null
  }

  // Define dimensions based on variant
  const dimensions = {
    horizontal: "h-[90px] w-full",
    vertical: "h-[600px] w-[160px] md:w-[300px]",
    square: "h-[250px] w-[250px] md:w-[300px] md:h-[300px]",
  }

  // Define background colors for demo purposes (would be replaced by actual ads)
  const bgColors = {
    sidebar: "bg-gradient-to-br from-primary/10 to-primary/5",
    content: "bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10",
    footer: "bg-gradient-to-tr from-primary/10 to-primary/5",
  }

  return (
    <Card className={`overflow-hidden ${dimensions[variant]} ${bgColors[position]} ${className}`}>
      <div className="absolute right-1 top-1 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-full bg-background/80 hover:bg-background"
          onClick={() => setDismissed(true)}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Close ad</span>
        </Button>
      </div>
      <CardContent className="flex h-full flex-col items-center justify-center p-2">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Advertisement</div>
        <div className="my-2 text-center text-sm font-medium">
          {variant === "horizontal" ? "Discover Adestra Premium Services" : "Boost Your Earnings with Adestra"}
        </div>
        {variant !== "horizontal" && (
          <div className="mb-2 text-center text-xs text-muted-foreground">
            Get exclusive access to high-paying micro tasks
          </div>
        )}
      </CardContent>
      <CardFooter className="absolute bottom-0 flex w-full justify-center p-1">
        <Button variant="link" size="sm" className="h-6 text-xs">
          Learn More
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}
