import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"

interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "earning"
  amount: string
  status: "completed" | "pending" | "rejected"
  date: string
  method: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const statusColors = {
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  const typeIcons = {
    deposit: <ArrowDown className="h-4 w-4 text-green-500" />,
    withdrawal: <ArrowUp className="h-4 w-4 text-red-500" />,
    earning: <DollarSign className="h-4 w-4 text-blue-500" />,
  }

  const typeLabels = {
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    earning: "Earning",
  }

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <Card className="p-6 text-center text-muted-foreground">No transactions found</Card>
      ) : (
        transactions.map((transaction) => (
          <Card key={transaction.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  {typeIcons[transaction.type]}
                </div>
                <div>
                  <div className="font-medium">{typeLabels[transaction.type]}</div>
                  <div className="text-sm text-muted-foreground">{transaction.method}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{transaction.amount}</div>
                <div className="text-sm text-muted-foreground">{transaction.date}</div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">ID: {transaction.id}</div>
              <Badge className={statusColors[transaction.status]} variant="outline">
                {transaction.status}
              </Badge>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
