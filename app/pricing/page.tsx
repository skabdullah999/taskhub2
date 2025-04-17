import { CheckCircle2, HelpCircle, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"

export default function PricingPage() {
  const workerPlans = [
    {
      name: "Free",
      description: "Perfect for getting started with micro tasks",
      price: "$0",
      billing: "forever",
      features: [
        { name: "Access to all basic tasks", included: true },
        { name: "Standard withdrawal processing (48 hours)", included: true },
        { name: "Basic task filtering", included: true },
        { name: "2% withdrawal fee", included: true },
        { name: "Email support", included: true },
        { name: "Priority access to high-paying tasks", included: false },
        { name: "Faster withdrawal processing (24 hours)", included: false },
        { name: "Advanced task filtering", included: false },
        { name: "Reduced 1% withdrawal fee", included: false },
        { name: "Priority support", included: false },
      ],
      popular: false,
    },
    {
      name: "Premium",
      description: "For serious workers who want to maximize earnings",
      price: "$4.99",
      billing: "per month",
      features: [
        { name: "Access to all basic tasks", included: true },
        { name: "Standard withdrawal processing (48 hours)", included: true },
        { name: "Basic task filtering", included: true },
        { name: "2% withdrawal fee", included: false, replacement: "Reduced 1% withdrawal fee" },
        { name: "Email support", included: false, replacement: "Priority support" },
        { name: "Priority access to high-paying tasks", included: true },
        { name: "Faster withdrawal processing (24 hours)", included: true },
        { name: "Advanced task filtering", included: true },
        { name: "Reduced 1% withdrawal fee", included: true },
        { name: "Priority support", included: true },
      ],
      popular: true,
    },
  ]

  const advertiserPlans = [
    {
      name: "Basic",
      description: "For individuals and small businesses",
      price: "$0",
      billing: "5% service fee",
      features: [
        { name: "Post up to 5 active tasks", included: true },
        { name: "Basic targeting options", included: true },
        { name: "Standard worker quality", included: true },
        { name: "Email support", included: true },
        { name: "Basic analytics", included: true },
        { name: "Unlimited active tasks", included: false },
        { name: "Advanced targeting options", included: false },
        { name: "Premium worker pool", included: false },
        { name: "Priority support", included: false },
        { name: "Advanced analytics and reporting", included: false },
      ],
      popular: false,
    },
    {
      name: "Business",
      description: "For businesses with regular task needs",
      price: "$49.99",
      billing: "per month + 3% service fee",
      features: [
        { name: "Post up to 5 active tasks", included: false, replacement: "Unlimited active tasks" },
        { name: "Basic targeting options", included: false, replacement: "Advanced targeting options" },
        { name: "Standard worker quality", included: false, replacement: "Premium worker pool" },
        { name: "Email support", included: false, replacement: "Priority support" },
        { name: "Basic analytics", included: false, replacement: "Advanced analytics and reporting" },
        { name: "Unlimited active tasks", included: true },
        { name: "Advanced targeting options", included: true },
        { name: "Premium worker pool", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced analytics and reporting", included: true },
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      price: "Custom",
      billing: "contact for pricing",
      features: [
        { name: "Unlimited active tasks", included: true },
        { name: "Advanced targeting options", included: true },
        { name: "Premium worker pool", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced analytics and reporting", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Custom API integration", included: true },
        { name: "White-label options", included: true },
        { name: "Custom worker vetting", included: true },
        { name: "Service level agreement", included: true },
      ],
      popular: false,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Choose the plan that's right for you, whether you're completing tasks or posting them.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Tables */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="workers" className="mx-auto max-w-5xl">
              <div className="flex justify-center">
                <TabsList className="mb-8">
                  <TabsTrigger value="workers">For Workers</TabsTrigger>
                  <TabsTrigger value="advertisers">For Advertisers</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="workers">
                <div className="grid gap-6 md:grid-cols-2">
                  {workerPlans.map((plan) => (
                    <Card key={plan.name} className={plan.popular ? "border-primary shadow-md" : "border-border"}>
                      {plan.popular && (
                        <div className="absolute right-4 top-4 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                          Popular
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="mt-4">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground"> / {plan.billing}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature) => {
                            const showFeature = feature.included || feature.replacement
                            return (
                              <li key={feature.name} className="flex items-center">
                                {feature.included ? (
                                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                                ) : (
                                  <X className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                <span
                                  className={
                                    feature.included
                                      ? ""
                                      : feature.replacement
                                        ? "line-through text-muted-foreground"
                                        : "text-muted-foreground"
                                  }
                                >
                                  {feature.name}
                                </span>
                                {feature.replacement && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="ml-1 h-3 w-3 text-muted-foreground" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Upgraded to: {feature.replacement}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </li>
                            )
                          })}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                          {plan.name === "Free" ? "Get Started" : "Subscribe Now"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="advertisers">
                <div className="grid gap-6 md:grid-cols-3">
                  {advertiserPlans.map((plan) => (
                    <Card key={plan.name} className={plan.popular ? "border-primary shadow-md" : "border-border"}>
                      {plan.popular && (
                        <div className="absolute right-4 top-4 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                          Popular
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="mt-4">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground"> / {plan.billing}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature) => {
                            const showFeature = feature.included || feature.replacement
                            return (
                              <li key={feature.name} className="flex items-center">
                                {feature.included ? (
                                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                                ) : (
                                  <X className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                <span
                                  className={
                                    feature.included
                                      ? ""
                                      : feature.replacement
                                        ? "line-through text-muted-foreground"
                                        : "text-muted-foreground"
                                  }
                                >
                                  {feature.name}
                                </span>
                                {feature.replacement && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="ml-1 h-3 w-3 text-muted-foreground" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Upgraded to: {feature.replacement}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </li>
                            )
                          })}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                          {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Ad Banner */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center">
              <AdBanner variant="horizontal" position="content" className="max-w-4xl" />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
              <p className="mt-2 text-muted-foreground">Have questions about our pricing? Find answers below.</p>
            </div>
            <div className="mx-auto mt-8 max-w-3xl space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Can I change plans at any time?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of
                    your next billing cycle.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>What payment methods do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We accept all major credit cards, PayPal, and mobile payment options including bKash, Nagad, Upay,
                    and Rocket.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Is there a free trial for premium plans?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Yes, we offer a 7-day free trial for our Premium Worker plan and a 14-day free trial for our
                    Business Advertiser plan.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>What is the service fee for advertisers?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    The service fee is a percentage charged on top of the payment you set for each task. For Basic
                    plans, it's 5% of the task value. For Business plans, it's reduced to 3%. Enterprise plans have
                    custom pricing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
