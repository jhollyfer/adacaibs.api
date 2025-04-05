import { UserRole, UserStatus } from '#core/constant'

interface Base {
  id?: string
  createdAt?: Date
  updatedAt?: Date | null
}

export interface User extends Base {
  avatar: string | null
  name: string
  email: string
  password: string
  role: UserRole
  status: UserStatus
}

export interface New extends Base {
  title: string
  category: string
  status: string
  resume: string
  content: string
  cover: string | null
  tags: string[]
}

export interface Event extends Base {
  title: string
  date: string
  hour: string
  locality: string
  address: string
  category: string
  capacity: number
  description: string
  content: string
  cover: string | null
}

export interface Podcast extends Base {
  title: string
  date: string
  duration: string
  presenters: string[]
  guests: string[]
  description: string
  cover: string | null
  content: string | null
}

export interface Video extends Base {
  title: string
  date: string
  duration: string
  instructor: string
  url: string
  description: string
  thumbnail: string | null
}

export interface Album extends Base {
  title: string
  date: string
  description: string
  cover: string | null
  images: string[]
}

interface Meta {
  total: number
  page: number
  perPage: number
  currentPage: number | null
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
