import type { Generated, Insertable, Selectable, Updateable } from "kysely"

// Define the database schema types for Kysely
export interface DB {
  users: UsersTable
  wallets: WalletsTable
  categories: CategoriesTable
  jobs: JobsTable
  tasks: TasksTable
  transactions: TransactionsTable
  messages: MessagesTable
  ratings: RatingsTable
  advertisements: AdvertisementsTable
  ad_impressions: AdImpressionsTable
  ad_clicks: AdClicksTable
}

// Define each table's structure
export interface UsersTable {
  id: Generated<string>
  email: string
  password_hash: string
  full_name: string
  user_type: "worker" | "advertiser" | "admin"
  profile_image: string | null
  bio: string | null
  created_at: Generated<Date>
  updated_at: Generated<Date>
  last_login: Date | null
  is_verified: Generated<boolean>
  verification_token: string | null
  reset_token: string | null
  reset_token_expires: Date | null
}

export interface WalletsTable {
  id: Generated<string>
  user_id: string
  balance: Generated<number>
  currency: Generated<string>
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface CategoriesTable {
  id: Generated<string>
  name: string
  description: string | null
  icon: string | null
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface JobsTable {
  id: Generated<string>
  advertiser_id: string
  category_id: string
  title: string
  description: string
  instructions: string
  payment_per_task: number
  max_workers: number
  remaining_spots: number
  proof_required: string
  difficulty: "Easy" | "Medium" | "Hard"
  estimated_time: string | null
  status: Generated<"active" | "paused" | "completed" | "cancelled">
  created_at: Generated<Date>
  updated_at: Generated<Date>
  expires_at: Date | null
}

export interface TasksTable {
  id: Generated<string>
  job_id: string
  worker_id: string
  status: Generated<"pending" | "submitted" | "approved" | "rejected">
  proof: string | null
  feedback: string | null
  submitted_at: Date | null
  reviewed_at: Date | null
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface TransactionsTable {
  id: Generated<string>
  user_id: string
  amount: number
  type: "deposit" | "withdrawal" | "task_payment" | "refund" | "fee"
  status: Generated<"pending" | "completed" | "failed">
  reference_id: string | null
  description: string | null
  task_id: string | null
  job_id: string | null
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface MessagesTable {
  id: Generated<string>
  sender_id: string
  recipient_id: string
  job_id: string | null
  task_id: string | null
  content: string
  is_read: Generated<boolean>
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface RatingsTable {
  id: Generated<string>
  rater_id: string
  rated_id: string
  task_id: string | null
  job_id: string | null
  rating: number
  comment: string | null
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface AdvertisementsTable {
  id: Generated<string>
  advertiser_id: string
  title: string
  description: string | null
  image_url: string | null
  target_url: string
  position: "header" | "content" | "sidebar" | "footer"
  variant: "horizontal" | "vertical" | "square"
  start_date: Date
  end_date: Date
  budget: number
  impressions: Generated<number>
  clicks: Generated<number>
  status: Generated<"pending" | "active" | "paused" | "completed" | "rejected">
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface AdImpressionsTable {
  id: Generated<string>
  ad_id: string
  user_id: string | null
  ip_address: string | null
  user_agent: string | null
  created_at: Generated<Date>
}

export interface AdClicksTable {
  id: Generated<string>
  ad_id: string
  user_id: string | null
  ip_address: string | null
  user_agent: string | null
  created_at: Generated<Date>
}

// Define types for database operations
export type User = Selectable<UsersTable>
export type NewUser = Insertable<UsersTable>
export type UserUpdate = Updateable<UsersTable>

export type Wallet = Selectable<WalletsTable>
export type NewWallet = Insertable<WalletsTable>
export type WalletUpdate = Updateable<WalletsTable>

export type Category = Selectable<CategoriesTable>
export type NewCategory = Insertable<CategoriesTable>
export type CategoryUpdate = Updateable<CategoriesTable>

export type Job = Selectable<JobsTable>
export type NewJob = Insertable<JobsTable>
export type JobUpdate = Updateable<JobsTable>

export type Task = Selectable<TasksTable>
export type NewTask = Insertable<TasksTable>
export type TaskUpdate = Updateable<TasksTable>

export type Transaction = Selectable<TransactionsTable>
export type NewTransaction = Insertable<TransactionsTable>
export type TransactionUpdate = Updateable<TransactionsTable>

export type Message = Selectable<MessagesTable>
export type NewMessage = Insertable<MessagesTable>
export type MessageUpdate = Updateable<MessagesTable>

export type Rating = Selectable<RatingsTable>
export type NewRating = Insertable<RatingsTable>
export type RatingUpdate = Updateable<RatingsTable>

export type Advertisement = Selectable<AdvertisementsTable>
export type NewAdvertisement = Insertable<AdvertisementsTable>
export type AdvertisementUpdate = Updateable<AdvertisementsTable>

export type AdImpression = Selectable<AdImpressionsTable>
export type NewAdImpression = Insertable<AdImpressionsTable>

export type AdClick = Selectable<AdClicksTable>
export type NewAdClick = Insertable<AdClicksTable>
