import Link from "next/link"
import { ArrowRight, Clock, DollarSign, FileCheck, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskCard } from "@/components/task-card"
import { AdBanner } from "@/components/ad-banner"

export default function WorkerDashboard() {
  // Sample data for demonstration
  const stats = [
    {
      title: "Total Earnings",
      value: "$124.50",
      icon: DollarSign,
      description: "This month: $42.50",
    },
    {
      title: "Completed Tasks",
      value: "32",
      icon: FileCheck,
      description: "This month: 12",
    },
    {
      title: "Pending Tasks",
      value: "5",
      icon: Clock,
      description: "Awaiting approval",
    },
    {
      title: "Available Jobs",
      value: "124",
      icon: FileText,
      description: "New today: 18",
    },
  ]

  const recentTasks = [
    {
      id: "task-1",
      title: "Like and Comment on YouTube Video",
      payment: "$0.50",
      status: "completed",
      date: "2 days ago",
      category: "Social Media",
    },
    {
      id: "task-2",
      title: "Download and Review Mobile App",
      payment: "$1.25",
      status: "pending",
      date: "1 day ago",
      category: "App Testing",
    },
    {
      id: "task-3",
      title: "Complete Short Survey",
      payment: "$0.75",
      status: "rejected",
      date: "3 days ago",
      category: "Surveys",
    },
    {
      id: "task-4",
      title: "Write Product Review",
      payment: "$2.00",
      status: "completed",
      date: "4 days ago",
      category: "Content Creation",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Worker Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's an overview of your activities.</p>
        </div>
        <Link href="/dashboard/jobs">
          <Button>
            Find New Jobs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Progress</CardTitle>
          <CardDescription>Your task completion rate for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Task Completion</p>
                <p className="text-xs text-muted-foreground">12 out of 15 tasks completed</p>
              </div>
              <div className="text-sm font-medium">80%</div>
            </div>
            <Progress value={80} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-[1fr_300px]">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Recent Tasks</h2>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {recentTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              <div className="flex justify-center">
                <Link href="/dashboard/my-tasks">
                  <Button variant="outline">View All Tasks</Button>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="completed" className="space-y-4">
              {recentTasks
                .filter((task) => task.status === "completed")
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
              {recentTasks
                .filter((task) => task.status === "pending")
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </TabsContent>
            <TabsContent value="rejected" className="space-y-4">
              {recentTasks
                .filter((task) => task.status === "rejected")
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </TabsContent>
          </Tabs>
        </div>
        <div className="hidden md:block">
          <h2 className="mb-4 text-xl font-semibold">Sponsored</h2>
          <AdBanner variant="square" position="content" />
        </div>
      </div>
    </div>
  )
}
