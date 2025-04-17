"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TaskCard } from "@/components/task-card"
import { AdBanner } from "@/components/ad-banner"

export default function MyTasksPage() {
  const [sortBy, setSortBy] = useState("newest")

  // Sample tasks data
  const tasks = [
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
      rejectionReason: "Answers were too short and didn't provide enough detail.",
    },
    {
      id: "task-4",
      title: "Write Product Review",
      payment: "$2.00",
      status: "completed",
      date: "4 days ago",
      category: "Content Creation",
    },
    {
      id: "task-5",
      title: "Follow Instagram Account",
      payment: "$0.40",
      status: "completed",
      date: "5 days ago",
      category: "Social Media",
    },
    {
      id: "task-6",
      title: "Test New Mobile Game",
      payment: "$1.50",
      status: "pending",
      date: "2 days ago",
      category: "App Testing",
    },
    {
      id: "task-7",
      title: "Website Feedback Survey",
      payment: "$1.00",
      status: "rejected",
      date: "6 days ago",
      category: "Surveys",
      rejectionReason: "Submission was incomplete. Please complete all required fields.",
    },
    {
      id: "task-8",
      title: "Research Local Businesses",
      payment: "$3.00",
      status: "completed",
      date: "1 week ago",
      category: "Web Research",
    },
  ]

  const completedTasks = tasks.filter((task) => task.status === "completed")
  const pendingTasks = tasks.filter((task) => task.status === "pending")
  const rejectedTasks = tasks.filter((task) => task.status === "rejected")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
        <p className="text-muted-foreground">View and manage all your tasks</p>
      </div>

      <div className="mb-6">
        <AdBanner variant="horizontal" position="content" />
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search tasks..." className="w-full appearance-none pl-8" />
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="highest">Highest Paying</SelectItem>
                  <SelectItem value="lowest">Lowest Paying</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({tasks.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingTasks.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedTasks.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </TabsContent>
            <TabsContent value="completed" className="space-y-4">
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="text-lg font-medium">No completed tasks</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You haven't completed any tasks yet. Browse available jobs to get started.
                  </p>
                  <Button className="mt-4" variant="outline" asChild>
                    <a href="/dashboard/jobs">Browse Jobs</a>
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="text-lg font-medium">No pending tasks</h3>
                  <p className="mt-2 text-sm text-muted-foreground">You don't have any tasks awaiting approval.</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="rejected" className="space-y-4">
              {rejectedTasks.length > 0 ? (
                rejectedTasks.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="text-lg font-medium">No rejected tasks</h3>
                  <p className="mt-2 text-sm text-muted-foreground">You don't have any rejected tasks.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" disabled>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                3
              </Button>
              <Button variant="outline" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Task Summary</h2>
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Tasks</span>
                  <span className="text-lg font-bold">{tasks.length}</span>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completed</span>
                  <span className="text-lg font-bold">{completedTasks.length}</span>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pending</span>
                  <span className="text-lg font-bold">{pendingTasks.length}</span>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Rejected</span>
                  <span className="text-lg font-bold">{rejectedTasks.length}</span>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Earnings</span>
                  <span className="text-lg font-bold">
                    $
                    {completedTasks
                      .reduce((sum, task) => sum + Number.parseFloat(task.payment.replace("$", "")), 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Sponsored</h2>
            <AdBanner variant="square" position="content" />
          </div>
        </div>
      </div>
    </div>
  )
}
