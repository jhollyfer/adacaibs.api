import { PaginationQuerySchema } from '#infra/http/validators/query.validator'
import vine from '@vinejs/vine'
import { TestimonialStatus } from '#core/constant'

export const TestimonialSchema = {
  create: {
    body: vine.object({
      name: vine.string().trim(),
      position: vine.string().trim(),
      rating: vine.string().trim(),
      testimonial: vine.string().trim(),
      photo: vine.string().trim().nullable(),
      status: vine.enum(Object.values(TestimonialStatus)),
    }),
  },
  update: {
    body: vine.object({
      name: vine.string().trim(),
      position: vine.string().trim(),
      rating: vine.string().trim(),
      testimonial: vine.string().trim(),
      photo: vine.string().trim().nullable(),
      status: vine.enum(Object.values(TestimonialStatus)),
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

export const TestimonialValidator = {
  create: {
    body: vine.compile(TestimonialSchema['create']['body']),
  },
  update: {
    body: vine.compile(TestimonialSchema['update']['body']),
    params: vine.compile(TestimonialSchema['update']['params']),
  },
  paginate: {
    query: vine.compile(TestimonialSchema['paginate']['query']),
  },
  delete: {
    params: vine.compile(TestimonialSchema['delete']['params']),
  },
}
