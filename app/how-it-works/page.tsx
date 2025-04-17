import { CheckCircle2, Clock, FileText, User } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"

export default function HowItWorksPage() {
  const workerSteps = [
    {
      title: "Create an Account",
      description: "Sign up for free and complete your profile to get started.",
      icon: User,
      details: [
        "Fill in your basic information",
        "Verify your email address",
        "Set up your payment preferences",
        "Complete your profile to increase your chances of approval",
      ],
    },
    {
      title: "Browse Available Tasks",
      description: "Find tasks that match your skills and interests.",
      icon: FileText,
      details: [
        "Use filters to find tasks that interest you",
        "Check task requirements and payment before applying",
        "View task difficulty and estimated completion time",
        "Apply for tasks that match your skills",
      ],
    },
    {
      title: "Complete Tasks",
      description: "Follow instructions carefully and submit proof of completion.",
      icon: CheckCircle2,
      details: [
        "Read all instructions thoroughly before starting",
        "Complete the task exactly as requested",
        "Take screenshots or provide required proof",
        "Submit your work through the platform",
      ],
    },
    {
      title: "Get Paid",
      description: "Once approved, money is added to your account balance.",
      icon: Clock,
      details: [
        "Advertisers review your submission",
        "Approved tasks are credited to your account",
        "Request withdrawals once you reach the minimum amount",
        "Get paid via your preferred payment method",
      ],
    },
  ]

  const advertiserSteps = [
    {
      title: "Create an Account",
      description: "Sign up as an advertiser and verify your business.",
      icon: User,
      details: [
        "Register as an advertiser",
        "Verify your email and business information",
        "Set up your payment method",
        "Complete your company profile",
      ],
    },
    {
      title: "Add Funds",
      description: "Deposit money to your account balance to fund your tasks.",
      icon: Clock,
      details: [
        "Choose your preferred payment method",
        "Add funds to your account",
        "Funds are available immediately for creating tasks",
        "Monitor your balance in the dashboard",
      ],
    },
    {
      title: "Create a Task",
      description: "Specify requirements, payment, and number of workers.",
      icon: FileText,
      details: [
        "Define clear task requirements and instructions",
        "Set payment per task and maximum number of workers",
        "Specify what proof workers need to submit",
        "Review and publish your task",
      ],
    },
    {
      title: "Review Submissions",
      description: "Approve or reject work submitted by workers.",
      icon: CheckCircle2,
      details: [
        "Receive notifications when tasks are completed",
        "Review submitted proof carefully",
        "Approve satisfactory submissions",
        "Provide feedback for rejected submissions",
      ],
    },
  ]

  const faqs = [
    {
      question: "How much money can I earn?",
      answer:
        "Earnings vary based on the tasks you complete. Simple tasks like social media engagement typically pay $0.10-$1.00, while more complex tasks like content creation can pay $1-$5 or more. The more tasks you complete, the more you earn.",
    },
    {
      question: "How do I withdraw my earnings?",
      answer:
        "Once you reach the minimum withdrawal amount of $2, you can request a withdrawal through your dashboard. We support multiple payment methods including bKash, Nagad, Upay, and Rocket. Withdrawals are processed within 24-48 hours.",
    },
    {
      question: "What happens if my submission is rejected?",
      answer:
        "If your submission is rejected, the advertiser will provide a reason. You can review the feedback and, depending on the task, you may be able to resubmit with corrections. Rejected tasks do not count toward your earnings.",
    },
    {
      question: "How do I create effective tasks as an advertiser?",
      answer:
        "Provide clear, detailed instructions with examples if possible. Set reasonable payment rates based on the complexity and time required. Be specific about the proof you need workers to submit. Monitor and respond to submissions promptly.",
    },
    {
      question: "Is there a fee for using the platform?",
      answer:
        "Workers can use the platform for free. Advertisers pay a 5% service fee on top of the task payments. There's also a 2% processing fee for withdrawals to cover transaction costs.",
    },
    {
      question: "How long does it take for tasks to be approved?",
      answer:
        "Most advertisers review submissions within 24-48 hours. Some may take longer depending on their volume of submissions. You'll receive a notification once your submission has been reviewed.",
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How TaskHub Works</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                TaskHub connects people who need small tasks completed with workers who want to earn money online. Learn
                how our platform works for both workers and advertisers.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="workers" className="mx-auto max-w-4xl">
              <div className="flex justify-center">
                <TabsList className="mb-8">
                  <TabsTrigger value="workers">For Workers</TabsTrigger>
                  <TabsTrigger value="advertisers">For Advertisers</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="workers">
                <div className="grid gap-8 md:grid-cols-2">
                  {workerSteps.map((step, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="bg-muted/50 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            {index + 1}
                          </div>
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                        </div>
                        <CardDescription>{step.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                              <span className="text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="advertisers">
                <div className="grid gap-8 md:grid-cols-2">
                  {advertiserSteps.map((step, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="bg-muted/50 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            {index + 1}
                          </div>
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                        </div>
                        <CardDescription>{step.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                              <span className="text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
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

        {/* FAQs */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
              <p className="mt-2 text-muted-foreground">Find answers to common questions about using TaskHub</p>
            </div>
            <div className="mx-auto mt-8 max-w-3xl space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
