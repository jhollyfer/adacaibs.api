import { NoticeCategory, NoticeStatus } from '#core/constant'
import { PaginationQuerySchema } from '#infra/http/validators/query.validator'
import vine from '@vinejs/vine'

export const NoticeSchema = {
  create: {
    body: vine.object({
      title: vine.string().trim(),
      category: vine.enum(NoticeCategory),
      status: vine.enum(NoticeStatus),
      resume: vine.string().trim(),
      content: vine.string().trim(),
      cover: vine.string().trim().nullable(),
      tags: vine.array(vine.string().trim()).optional(),
    }),
  },
  update: {
    body: vine.object({
      title: vine.string().trim().optional(),
      category: vine.enum(NoticeCategory).optional(),
      status: vine.enum(NoticeStatus).optional(),
      resume: vine.string().trim().optional(),
      content: vine.string().trim().optional(),
      cover: vine.string().trim().nullable(),
      tags: vine.array(vine.string().trim()).optional(),
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

export const NoticeValidator = {
  create: {
    body: vine.compile(NoticeSchema['create']['body']),
  },
  update: {
    body: vine.compile(NoticeSchema['update']['body']),
    params: vine.compile(NoticeSchema['update']['params']),
  },
  show: {
    params: vine.compile(NoticeSchema['show']['params']),
  },
  delete: {
    params: vine.compile(NoticeSchema['delete']['params']),
  },
  paginate: {
    query: vine.compile(NoticeSchema['paginate']['query']),
  },
}
