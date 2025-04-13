import { NewsCategory, NewsStatus } from '#core/constant'
import { PaginationQuerySchema } from '#infra/http/validators/query.validator'
import vine from '@vinejs/vine'

export const NewsSchema = {
  create: {
    body: vine.object({
      title: vine.string().trim(),
      category: vine.enum(NewsCategory),
      status: vine.enum(NewsStatus),
      resume: vine.string().trim(),
      content: vine.string().trim(),
      cover: vine.string().trim().nullable(),
      tags: vine.array(vine.string().trim()).optional(),
    }),
  },
  update: {
    body: vine.object({
      title: vine.string().trim().optional(),
      category: vine.enum(NewsCategory).optional(),
      status: vine.enum(NewsStatus).optional(),
      resume: vine.string().trim().optional(),
      content: vine.string().trim().optional(),
      cover: vine.string().trim().nullable(),
      tags: vine.array(vine.string().trim()).optional(),
    }),
    params: vine.object({
      id: vine.string().trim(),
    }),
  },
  findById: {
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

export const NewsValidator = {
  create: {
    body: vine.compile(NewsSchema['create']['body']),
  },
  update: {
    body: vine.compile(NewsSchema['update']['body']),
    params: vine.compile(NewsSchema['update']['params']),
  },
  findById: {
    params: vine.compile(NewsSchema['findById']['params']),
  },
  delete: {
    params: vine.compile(NewsSchema['delete']['params']),
  },
  paginate: {
    query: vine.compile(NewsSchema['paginate']['query']),
  },
}
