import { PaginationQuerySchema } from '#infra/http/validators/query.validator'
import vine from '@vinejs/vine'

export const VideoSchema = {
  create: {
    body: vine.object({
      title: vine.string().trim(),
      date: vine.string().trim(),
      duration: vine.string().trim(),
      instructor: vine.string().trim(),
      url: vine.string().trim(),
      description: vine.string().trim(),
      thumbnail: vine.string().trim().nullable(),
    }),
  },
  update: {
    body: vine.object({
      title: vine.string().trim(),
      date: vine.string().trim(),
      duration: vine.string().trim(),
      instructor: vine.string().trim(),
      url: vine.string().trim(),
      description: vine.string().trim(),
      thumbnail: vine.string().trim().nullable(),
    }),
    params: vine.object({
      id: vine.string().trim(),
    }),
  },
  paginate: {
    query: PaginationQuerySchema,
  },
  delete: {
    params: vine.object({
      id: vine.string().trim(),
    }),
  },
}

export const VideoValidator = {
  create: {
    body: vine.compile(VideoSchema['create']['body']),
  },
  update: {
    body: vine.compile(VideoSchema['update']['body']),
    params: vine.compile(VideoSchema['update']['params']),
  },
  paginate: {
    query: vine.compile(VideoSchema['paginate']['query']),
  },
  delete: {
    params: vine.compile(VideoSchema['delete']['params']),
  },
}
