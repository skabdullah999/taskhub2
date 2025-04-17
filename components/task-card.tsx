import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Task {
  id: string
  title: string
  payment: string
  status: "completed" | "pending" | "rejected"
  date: string
  category: string
}

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const statusColors = {
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  const statusText = {
    completed: "Completed",
    pending: "Pending",
    rejected: "Rejected",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-muted-foreground">{task.category}</p>
          </div>
          <Badge className={statusColors[task.status]} variant="outline">
            {statusText[task.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium">Payment:</span> {task.payment}
          </div>
          <div className="text-xs text-muted-foreground">{task.date}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/my-tasks/${task.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
