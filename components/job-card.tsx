import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface Job {
  id: string
  title: string
  budget: string
  status: "active" | "completed" | "paused"
  progress: number
  date: string
  category: string
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const statusColors = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  }

  const statusText = {
    active: "Active",
    completed: "Completed",
    paused: "Paused",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm text-muted-foreground">{job.category}</p>
          </div>
          <Badge className={statusColors[job.status]} variant="outline">
            {statusText[job.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">Budget:</span> {job.budget}
            </div>
            <div className="text-xs text-muted-foreground">{job.date}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div>Progress</div>
              <div>{job.progress}%</div>
            </div>
            <Progress value={job.progress} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/advertiser/my-jobs/${job.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
