import { PaginationQuerySchema } from '#infra/http/validators/query.validator'
import vine from '@vinejs/vine'

export const PodcastSchema = {
  create: {
    body: vine.object({
      title: vine.string().trim(),
      date: vine.string().trim(),
      duration: vine.string().trim(),
      presenters: vine.array(vine.string().trim()),
      guests: vine.array(vine.string().trim()),
      description: vine.string().trim(),
      cover: vine.string().trim().nullable(),
      content: vine.string().trim().nullable(),
    }),
  },
  update: {
    body: vine.object({
      title: vine.string().trim(),
      date: vine.string().trim(),
      duration: vine.string().trim(),
      presenters: vine.array(vine.string().trim()),
      guests: vine.array(vine.string().trim()),
      description: vine.string().trim(),
      cover: vine.string().trim().nullable(),
      content: vine.string().trim().nullable(),
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

export const PodcastValidator = {
  create: {
    body: vine.compile(PodcastSchema['create']['body']),
  },
  update: {
    body: vine.compile(PodcastSchema['update']['body']),
    params: vine.compile(PodcastSchema['update']['params']),
  },
  paginate: {
    query: vine.compile(PodcastSchema['paginate']['query']),
  },
  delete: {
    params: vine.compile(PodcastSchema['delete']['params']),
  },
}
