import Link from "next/link"
import { Clock, DollarSign, FileCheck, FileText, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobCard } from "@/components/job-card"

export default function AdvertiserDashboard() {
  // Sample data for demonstration
  const stats = [
    {
      title: "Total Spent",
      value: "$245.50",
      icon: DollarSign,
      description: "This month: $125.50",
    },
    {
      title: "Active Jobs",
      value: "8",
      icon: FileText,
      description: "3 ending soon",
    },
    {
      title: "Completed Jobs",
      value: "24",
      icon: FileCheck,
      description: "This month: 6",
    },
    {
      title: "Pending Reviews",
      value: "12",
      icon: Clock,
      description: "Awaiting your approval",
    },
  ]

  const recentJobs = [
    {
      id: "job-1",
      title: "Like and Comment on YouTube Video",
      budget: "$25.00",
      status: "active",
      progress: 65,
      date: "Created 2 days ago",
      category: "Social Media",
    },
    {
      id: "job-2",
      title: "Download and Review Mobile App",
      budget: "$50.00",
      status: "active",
      progress: 30,
      date: "Created 1 day ago",
      category: "App Testing",
    },
    {
      id: "job-3",
      title: "Complete Short Survey",
      budget: "$15.00",
      status: "completed",
      progress: 100,
      date: "Completed 3 days ago",
      category: "Surveys",
    },
    {
      id: "job-4",
      title: "Write Product Review",
      budget: "$40.00",
      status: "completed",
      progress: 100,
      date: "Completed 4 days ago",
      category: "Content Creation",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advertiser Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's an overview of your campaigns.</p>
        </div>
        <Link href="/dashboard/advertiser/create-job">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Job
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
          <CardTitle>Account Balance</CardTitle>
          <CardDescription>Your current balance and recent spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Current Balance</p>
                <p className="text-xs text-muted-foreground">Available for new jobs</p>
              </div>
              <div className="text-2xl font-bold">$154.50</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Monthly Spending</div>
                <div className="font-medium">$125.50 / $500.00</div>
              </div>
              <Progress value={25} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/advertiser/wallet" className="w-full">
            <Button variant="outline" className="w-full">
              Add Funds
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Recent Jobs</h2>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {recentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
            <div className="flex justify-center">
              <Link href="/dashboard/advertiser/my-jobs">
                <Button variant="outline">View All Jobs</Button>
              </Link>
            </div>
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
            {recentJobs
              .filter((job) => job.status === "active")
              .map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            {recentJobs
              .filter((job) => job.status === "completed")
              .map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
