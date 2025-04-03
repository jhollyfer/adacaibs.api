import { UserRole, UserStatus } from '#core/constant'

export interface User {
  id?: string
  name: string
  email: string
  password: string
  role: UserRole
  status: UserStatus
  createdAt?: Date
  updatedAt?: Date | null
}

interface Meta {
  total: number
  page: number
  perPage: number
  currentPage: string | null
  lastPage: number
  firstPage: number
  lastPageUrl: string | null
  firstPageUrl: string | null
  nextPageUrl: string | null
  previousPageUrl: string | null
}

export interface Paginated<Entity> {
  data: Entity
  meta: Meta
}
