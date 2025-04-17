"use client"

import { useState } from "react"
import { Filter, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { JobListingCard } from "@/components/job-listing-card"
import { AdBanner } from "@/components/ad-banner"

export default function AvailableJobsPage() {
  const [sortBy, setSortBy] = useState("newest")
  const [paymentRange, setPaymentRange] = useState([0.1, 5])

  // Sample job listings data
  const jobListings = [
    {
      id: "job-1",
      title: "Like and Comment on YouTube Video",
      description: "Watch a 2-minute video, like it, and leave a positive comment.",
      category: "Social Media",
      payment: "$0.50",
      estimatedTime: "2 min",
      difficulty: "Easy",
      postedDate: "2 hours ago",
      remainingSpots: 15,
    },
    {
      id: "job-2",
      title: "Download and Review Mobile Game",
      description: "Download our new game, play for 10 minutes, and leave a review on the app store.",
      category: "App Testing",
      payment: "$1.25",
      estimatedTime: "15 min",
      difficulty: "Easy",
      postedDate: "5 hours ago",
      remainingSpots: 8,
    },
    {
      id: "job-3",
      title: "Complete Short Survey About Shopping Habits",
      description: "Answer 10 questions about your online shopping preferences and habits.",
      category: "Surveys",
      payment: "$0.75",
      estimatedTime: "5 min",
      difficulty: "Easy",
      postedDate: "1 day ago",
      remainingSpots: 50,
    },
    {
      id: "job-4",
      title: "Write a Product Review (250 words)",
      description: "Write an honest review for our skincare product after using the sample.",
      category: "Content Creation",
      payment: "$2.00",
      estimatedTime: "20 min",
      difficulty: "Medium",
      postedDate: "2 days ago",
      remainingSpots: 5,
    },
    {
      id: "job-5",
      title: "Follow Instagram Account and Like Recent Posts",
      description: "Follow our business account and like our 5 most recent posts.",
      category: "Social Media",
      payment: "$0.40",
      estimatedTime: "3 min",
      difficulty: "Easy",
      postedDate: "3 days ago",
      remainingSpots: 25,
    },
    {
      id: "job-6",
      title: "Research Information About Local Businesses",
      description: "Find contact information and business hours for 10 local restaurants in your area.",
      category: "Web Research",
      payment: "$3.50",
      estimatedTime: "30 min",
      difficulty: "Medium",
      postedDate: "3 days ago",
      remainingSpots: 3,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Available Jobs</h1>
        <p className="text-muted-foreground">Find and complete tasks that match your skills and interests</p>
      </div>

      <div className="mb-6">
        <AdBanner variant="horizontal" position="content" />
      </div>

      <div className="grid gap-6 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Filters - Desktop */}
        <div className="hidden space-y-6 md:block">
          <div>
            <h3 className="mb-4 text-lg font-medium">Filters</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Categories</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="social-media" />
                    <Label htmlFor="social-media">Social Media</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="app-testing" />
                    <Label htmlFor="app-testing">App Testing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="content-creation" />
                    <Label htmlFor="content-creation">Content Creation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="web-research" />
                    <Label htmlFor="web-research">Web Research</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="surveys" />
                    <Label htmlFor="surveys">Surveys</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Payment Range</h4>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[0.1, 5]}
                    max={5}
                    min={0.1}
                    step={0.1}
                    value={paymentRange}
                    onValueChange={setPaymentRange}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${paymentRange[0].toFixed(2)}</span>
                    <span className="text-sm">${paymentRange[1].toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Difficulty</h4>
                <RadioGroup defaultValue="all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-difficulty" />
                    <Label htmlFor="all-difficulty">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="easy" id="easy" />
                    <Label htmlFor="easy">Easy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hard" id="hard" />
                    <Label htmlFor="hard">Hard</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Estimated Time</h4>
                <RadioGroup defaultValue="all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-time" />
                    <Label htmlFor="all-time">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="under5" id="under5" />
                    <Label htmlFor="under5">Under 5 minutes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5to15" id="5to15" />
                    <Label htmlFor="5to15">5-15 minutes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="over15" id="over15" />
                    <Label htmlFor="over15">Over 15 minutes</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Search and Sort - Mobile and Desktop */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search jobs..." className="w-full appearance-none pl-8" />
            </div>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Filters</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Categories</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="mobile-social-media" />
                            <Label htmlFor="mobile-social-media">Social Media</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="mobile-app-testing" />
                            <Label htmlFor="mobile-app-testing">App Testing</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="mobile-content-creation" />
                            <Label htmlFor="mobile-content-creation">Content Creation</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="mobile-web-research" />
                            <Label htmlFor="mobile-web-research">Web Research</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="mobile-surveys" />
                            <Label htmlFor="mobile-surveys">Surveys</Label>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h4 className="font-medium">Payment Range</h4>
                        <div className="space-y-4">
                          <Slider
                            defaultValue={[0.1, 5]}
                            max={5}
                            min={0.1}
                            step={0.1}
                            value={paymentRange}
                            onValueChange={setPaymentRange}
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-sm">${paymentRange[0].toFixed(2)}</span>
                            <span className="text-sm">${paymentRange[1].toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full">Apply Filters</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="highest">Highest Paying</SelectItem>
                    <SelectItem value="lowest">Lowest Paying</SelectItem>
                    <SelectItem value="quickest">Quickest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div>
            <p className="text-sm text-muted-foreground">Showing {jobListings.length} results</p>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {jobListings.map((job) => (
              <JobListingCard key={job.id} job={job} />
            ))}
          </div>

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
      </div>
    </div>
  )
}
