import Link from "next/link"
import { Clock, DollarSign, BarChart } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface JobListing {
  id: string
  title: string
  description: string
  category: string
  payment: string
  estimatedTime: string
  difficulty: string
  postedDate: string
  remainingSpots: number
}

interface JobListingCardProps {
  job: JobListing
}

export function JobListingCard({ job }: JobListingCardProps) {
  const difficultyColors = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm text-muted-foreground">{job.category}</p>
          </div>
          <Badge className={difficultyColors[job.difficulty as keyof typeof difficultyColors]} variant="outline">
            {job.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="mb-4 text-sm">{job.description}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>{job.payment}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{job.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart className="h-4 w-4 text-muted-foreground" />
            <span>{job.remainingSpots} spots left</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Posted {job.postedDate}</span>
        <Link href={`/job/${job.id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
