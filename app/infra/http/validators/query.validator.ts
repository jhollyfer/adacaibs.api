import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const PaginationQuerySchema = vine.object({
  search: vine.string().trim().optional(),
  page: vine.number().optional(),
  perPage: vine.number().optional(),
})

export type PaginationQuery = Infer<typeof PaginationQuerySchema>
