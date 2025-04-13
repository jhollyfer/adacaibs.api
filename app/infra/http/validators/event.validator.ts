import { EventCategory } from '#core/constant'
import { PaginationQuerySchema } from '#infra/http/validators/query.validator'
import vine from '@vinejs/vine'

export const EventSchema = {
  create: {
    body: vine.object({
      title: vine.string().trim(),
      date: vine.string().trim(),
      hour: vine.string().trim(),
      location: vine.string().trim(),
      address: vine.string().trim(),
      category: vine.enum(EventCategory),
      capacity: vine.number().positive(),
      description: vine.string().trim(),
      detailedContent: vine.string().trim(),
      cover: vine.string().trim().nullable(),
    }),
  },
  update: {
    body: vine.object({
      title: vine.string().trim().optional(),
      date: vine.string().trim().optional(),
      hour: vine.string().trim().optional(),
      location: vine.string().trim().optional(),
      address: vine.string().trim().optional(),
      category: vine.enum(EventCategory).optional(),
      capacity: vine.number().positive().optional(),
      description: vine.string().trim().optional(),
      detailedContent: vine.string().trim().optional(),
      cover: vine.string().trim().nullable(),
    }),
    params: vine.object({
      id: vine.string().trim(),
    }),
  },
  show: {
    params: vine.object({
      id: vine.string().trim(),
    }),
  },
  delete: {
    params: vine.object({
      id: vine.string().trim(),
    }),
  },
  paginate: {
    query: PaginationQuerySchema,
  },
}

export const EventValidator = {
  create: {
    body: vine.compile(EventSchema['create']['body']),
  },
  update: {
    body: vine.compile(EventSchema['update']['body']),
    params: vine.compile(EventSchema['update']['params']),
  },
  show: {
    params: vine.compile(EventSchema['show']['params']),
  },
  delete: {
    params: vine.compile(EventSchema['delete']['params']),
  },
  paginate: {
    query: vine.compile(EventSchema['paginate']['query']),
  },
}
