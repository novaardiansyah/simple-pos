export type User = {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export type UserResponse = {
  success: boolean
  message: string
  data: User
}
