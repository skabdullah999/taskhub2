"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, CreditCard, DollarSign, History, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TransactionHistory } from "@/components/transaction-history"

export default function WalletPage() {
  const [depositMethod, setDepositMethod] = useState("bkash")
  const [withdrawMethod, setWithdrawMethod] = useState("bkash")

  // Sample data for demonstration
  const transactions = [
    {
      id: "tx-1",
      type: "deposit",
      amount: "$10.00",
      status: "completed",
      date: "2023-04-15",
      method: "bKash",
    },
    {
      id: "tx-2",
      type: "withdrawal",
      amount: "$5.00",
      status: "pending",
      date: "2023-04-14",
      method: "Nagad",
    },
    {
      id: "tx-3",
      type: "earning",
      amount: "$0.75",
      status: "completed",
      date: "2023-04-13",
      method: "Task Completion",
    },
    {
      id: "tx-4",
      type: "deposit",
      amount: "$20.00",
      status: "completed",
      date: "2023-04-10",
      method: "Rocket",
    },
    {
      id: "tx-5",
      type: "withdrawal",
      amount: "$15.00",
      status: "completed",
      date: "2023-04-05",
      method: "bKash",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
        <p className="text-muted-foreground">Manage your funds, make deposits and withdrawals</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124.50</div>
            <p className="text-xs text-muted-foreground">Last updated: Today at 12:45 PM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245.75</div>
            <p className="text-xs text-muted-foreground">From 87 completed tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Balance</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.25</div>
            <p className="text-xs text-muted-foreground">From 5 pending tasks</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="deposit">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="deposit">
            <ArrowDown className="mr-2 h-4 w-4" />
            Deposit
          </TabsTrigger>
          <TabsTrigger value="withdraw">
            <ArrowUp className="mr-2 h-4 w-4" />
            Withdraw
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-2 h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="deposit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deposit Funds</CardTitle>
              <CardDescription>Add money to your account using mobile banking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Payment Method</Label>
                <RadioGroup
                  defaultValue="bkash"
                  className="grid grid-cols-2 gap-4 md:grid-cols-4"
                  value={depositMethod}
                  onValueChange={setDepositMethod}
                >
                  <div>
                    <RadioGroupItem value="bkash" id="bkash" className="peer sr-only" />
                    <Label
                      htmlFor="bkash"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">bKash</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="nagad" id="nagad" className="peer sr-only" />
                    <Label
                      htmlFor="nagad"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Nagad</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="rocket" id="rocket" className="peer sr-only" />
                    <Label
                      htmlFor="rocket"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Rocket</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="upay" id="upay" className="peer sr-only" />
                    <Label
                      htmlFor="upay"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Upay</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input id="amount" type="number" placeholder="10.00" min="1" step="0.01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sender-number">Sender Mobile Number</Label>
                <Input id="sender-number" placeholder="e.g., 01712345678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transaction-id">Transaction ID</Label>
                <Input id="transaction-id" placeholder="e.g., TXN123456789" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit Deposit Request</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Deposit Instructions</CardTitle>
              <CardDescription>Follow these steps to deposit funds</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-4 space-y-2">
                <li>
                  Send money to our {depositMethod.toUpperCase()} number:{" "}
                  <span className="font-medium">01712345678</span>
                </li>
                <li>Enter the amount you sent in the form above</li>
                <li>Enter your mobile number that you used to send the money</li>
                <li>Enter the transaction ID from your payment confirmation</li>
                <li>Our team will verify your payment and credit your account within 24 hours</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="withdraw" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
              <CardDescription>Withdraw your earnings to your mobile banking account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Withdrawal Method</Label>
                <RadioGroup
                  defaultValue="bkash"
                  className="grid grid-cols-2 gap-4 md:grid-cols-4"
                  value={withdrawMethod}
                  onValueChange={setWithdrawMethod}
                >
                  <div>
                    <RadioGroupItem value="bkash" id="withdraw-bkash" className="peer sr-only" />
                    <Label
                      htmlFor="withdraw-bkash"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">bKash</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="nagad" id="withdraw-nagad" className="peer sr-only" />
                    <Label
                      htmlFor="withdraw-nagad"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Nagad</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="rocket" id="withdraw-rocket" className="peer sr-only" />
                    <Label
                      htmlFor="withdraw-rocket"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Rocket</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="upay" id="withdraw-upay" className="peer sr-only" />
                    <Label
                      htmlFor="withdraw-upay"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Upay</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Amount (USD)</Label>
                <Input id="withdraw-amount" type="number" placeholder="10.00" min="2" step="0.01" />
                <p className="text-xs text-muted-foreground">Minimum withdrawal amount is $2.00</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile-number">Your Mobile Number</Label>
                <Input id="mobile-number" placeholder="e.g., 01712345678" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit Withdrawal Request</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Information</CardTitle>
              <CardDescription>Important details about withdrawals</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-2">
                <li>Minimum withdrawal amount is $2.00</li>
                <li>Withdrawals are processed manually within 24-48 hours</li>
                <li>Make sure to enter the correct mobile number</li>
                <li>A 2% processing fee applies to all withdrawals</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Transaction Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Transactions</SelectItem>
                      <SelectItem value="deposit">Deposits</SelectItem>
                      <SelectItem value="withdrawal">Withdrawals</SelectItem>
                      <SelectItem value="earning">Earnings</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <TransactionHistory transactions={transactions} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
