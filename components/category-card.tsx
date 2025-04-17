import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface CategoryCardProps {
  icon: ReactNode
  title: string
  description: string
  count: number
}

export function CategoryCard({ icon, title, description, count }: CategoryCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/50 px-6 py-3">
        <span className="text-sm font-medium">{count} tasks</span>
        <Link
          href={`/category/${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="flex items-center gap-1 text-xs font-medium text-primary"
        >
          View All
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  )
}
