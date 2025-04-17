"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function CreateJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    instructions: "",
    paymentPerTask: "",
    maxWorkers: "",
    proofRequired: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/advertiser">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create New Job</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Provide information about the task you want workers to complete</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Like and Comment on YouTube Video"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social-media">Social Media Engagement</SelectItem>
                  <SelectItem value="app-testing">App Testing</SelectItem>
                  <SelectItem value="content-creation">Content Creation</SelectItem>
                  <SelectItem value="web-research">Web Research</SelectItem>
                  <SelectItem value="surveys">Surveys</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe what this job is about"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Step-by-Step Instructions</Label>
              <Textarea
                id="instructions"
                name="instructions"
                placeholder="Provide clear instructions for workers to follow"
                rows={5}
                value={formData.instructions}
                onChange={handleChange}
                required
              />
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="paymentPerTask">Payment Per Task (USD)</Label>
                <Input
                  id="paymentPerTask"
                  name="paymentPerTask"
                  type="number"
                  placeholder="0.50"
                  min="0.10"
                  step="0.01"
                  value={formData.paymentPerTask}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxWorkers">Maximum Workers</Label>
                <Input
                  id="maxWorkers"
                  name="maxWorkers"
                  type="number"
                  placeholder="10"
                  min="1"
                  value={formData.maxWorkers}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proofRequired">Proof Required</Label>
              <Textarea
                id="proofRequired"
                name="proofRequired"
                placeholder="Describe what proof workers need to submit (e.g., screenshot, link, username)"
                rows={3}
                value={formData.proofRequired}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button type="submit" className="w-full">
              Create Job
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Total cost: $
              {formData.paymentPerTask && formData.maxWorkers
                ? (Number.parseFloat(formData.paymentPerTask) * Number.parseInt(formData.maxWorkers)).toFixed(2)
                : "0.00"}{" "}
              + 5% service fee
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
