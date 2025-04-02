import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const PaginationQuerySchema = vine.object({
  search: vine.string().trim().optional(),
  page: vine
    .number()
    .min(1)
    .optional()
    .transform((page) => Number(page ?? 1)),
  per_page: vine
    .number()
    .min(10)
    .optional()
    .transform((perPage) => Number(perPage ?? 10)),
})

export type PaginationQuery = Infer<typeof PaginationQuerySchema>
