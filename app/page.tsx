import Link from "next/link"
import { ArrowRight, Download, MessageSquare, Search, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoryCard } from "@/components/category-card"
import { HowItWorks } from "@/components/how-it-works"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Earn Money by Completing Simple Tasks
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join thousands of users who earn or get their tasks done on TaskHub. The easiest way to make money
                    online or get your tasks completed.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/browse-jobs">
                    <Button size="lg" variant="outline">
                      Browse Jobs
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full max-w-[500px] rounded-lg bg-muted p-4 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-background/80 rounded-lg" />
                  <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 text-center">
                    <div className="rounded-full bg-primary p-3 text-primary-foreground">
                      <Search className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">Find Tasks</h3>
                    <p className="text-muted-foreground">Search from thousands of available micro tasks</p>
                    <div className="w-full max-w-sm">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search for tasks..."
                          className="w-full appearance-none bg-background pl-8 shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Categories</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Browse through our most popular task categories
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <CategoryCard
                icon={<ThumbsUp className="h-8 w-8" />}
                title="Social Media Engagement"
                description="Like, comment, and share posts on various platforms"
                count={245}
              />
              <CategoryCard
                icon={<Download className="h-8 w-8" />}
                title="App Downloads"
                description="Install and review apps on Google Play or App Store"
                count={187}
              />
              <CategoryCard
                icon={<MessageSquare className="h-8 w-8" />}
                title="Content Creation"
                description="Write reviews, comments, and short content pieces"
                count={312}
              />
              <CategoryCard
                icon={<Search className="h-8 w-8" />}
                title="Web Research"
                description="Find information and complete simple research tasks"
                count={156}
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Simple steps to start earning or get your tasks done
                </p>
              </div>
            </div>
            <Tabs defaultValue="workers" className="mt-8">
              <div className="flex justify-center">
                <TabsList className="mb-8">
                  <TabsTrigger value="workers">For Workers</TabsTrigger>
                  <TabsTrigger value="advertisers">For Advertisers</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="workers">
                <HowItWorks
                  steps={[
                    {
                      title: "Create an Account",
                      description: "Sign up and complete your profile to get started",
                    },
                    {
                      title: "Browse Available Tasks",
                      description: "Find tasks that match your skills and interests",
                    },
                    {
                      title: "Complete Tasks",
                      description: "Follow instructions and submit proof of completion",
                    },
                    {
                      title: "Get Paid",
                      description: "Once approved, money is added to your balance",
                    },
                  ]}
                />
              </TabsContent>
              <TabsContent value="advertisers">
                <HowItWorks
                  steps={[
                    {
                      title: "Create an Account",
                      description: "Sign up and verify your advertiser account",
                    },
                    {
                      title: "Add Funds",
                      description: "Deposit money to your account balance",
                    },
                    {
                      title: "Create a Task",
                      description: "Specify requirements, payment, and number of workers",
                    },
                    {
                      title: "Review Submissions",
                      description: "Approve or reject work submitted by workers",
                    },
                  ]}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Join our community of workers and advertisers today
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg">Create an Account</Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Banner Section */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center">
              <AdBanner variant="horizontal" position="footer" className="max-w-4xl" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
