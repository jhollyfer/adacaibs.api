import type {
  EventCategory,
  NoticeCategory,
  NoticeStatus,
  TestimonialStatus,
  UserRole,
  UserStatus,
} from '#core/constant'
import { DateTime } from 'luxon'

interface Base {
  id?: string
  createdAt?: Date | DateTime
  updatedAt?: Date | DateTime | null
}

export interface User extends Base {
  avatar: string | null
  name: string
  email: string
  password: string
  role: UserRole
  status: UserStatus
}

export interface Notice extends Base {
  title: string
  category: NoticeCategory
  status: NoticeStatus
  resume: string
  content: string
  cover: string | null
  tags: string[]
}

export interface Events extends Base {
  title: string
  date: string
  hour: string // Format: "HH:MM - HH:MM" (e.g., "14:00 - 18:00")
  location: string
  address: string
  category: EventCategory
  capacity: number
  description: string
  detailedContent: string // Can contain HTML
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

export interface Testimonial extends Base {
  name: string
  position: string
  rating: string
  testimonial: string
  photo: string | null
  status: TestimonialStatus
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

export type Payload<T extends Base> = Omit<T, 'createdAt' | 'updatedAt'>
