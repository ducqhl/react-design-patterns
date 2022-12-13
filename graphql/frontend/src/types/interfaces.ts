import { User } from './types'

// User
export interface IUserLogin extends User {
  id?: string
  token?: string
  createdAt?: Date
  updatedAt?: Date
}