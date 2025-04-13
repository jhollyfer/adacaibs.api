import { PaginationQuerySchema } from '#infra/http/validators/query.validator'
import vine from '@vinejs/vine'
export const AlbumSchema = {
  create: {
    body: vine.object({
      title: vine.string().trim(),
      date: vine.string().trim().trim(),
      description: vine.string().trim().trim(),
      cover: vine.string().trim().nullable(),
      images: vine.array(vine.string().trim()),
    }),
  },
  update: {
    body: vine.object({
      title: vine.string().trim(),
      date: vine.string().trim().trim(),
      description: vine.string().trim().trim(),
      cover: vine.string().trim().nullable(),
      images: vine.array(vine.string().trim()),
    }),
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

export const AlbumValidator = {
  create: {
    body: vine.compile(AlbumSchema['create']['body']),
  },
  update: {
    body: vine.compile(AlbumSchema['update']['body']),
    params: vine.compile(AlbumSchema['update']['params']),
  },
  delete: {
    params: vine.compile(AlbumSchema['delete']['params']),
  },
  paginate: {
    query: vine.compile(AlbumSchema['paginate']['query']),
  },
}
