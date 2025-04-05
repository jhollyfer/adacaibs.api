import { UserRole } from '#core/constant'
import { PaginationQuerySchema } from '#infra/http/validators/query.validator'
import vine from '@vinejs/vine'

export const UserSchema = {
  'sign-in': {
    body: vine.object({
      email: vine.string().trim().email(),
      password: vine.string().trim(),
    }),
  },
  'create': {
    body: vine.object({
      name: vine.string().trim(),
      email: vine.string().trim().email(),
      role: vine.enum(UserRole),
      avatar: vine.string().trim().nullable(),
    }),
  },
  'update': {
    body: vine.object({
      name: vine.string().trim().optional(),
      email: vine.string().trim().email(),
      role: vine.enum(UserRole).optional(),
    }),
    params: vine.object({
      id: vine.string().trim(),
    }),
  },
  'remove': {
    params: vine.object({
      id: vine.string().trim(),
    }),
  },
  'paginate': {
    query: PaginationQuerySchema,
  },
}

export const UserValidator = {
  'sign-in': {
    body: vine.compile(UserSchema['sign-in']['body']),
  },
  'create': {
    body: vine.compile(UserSchema['create']['body']),
  },
  'update': {
    body: vine.compile(UserSchema['update']['body']),
    params: vine.compile(UserSchema['update']['params']),
  },
  'remove': {
    params: vine.compile(UserSchema['remove']['params']),
  },
  'paginate': {
    query: vine.compile(UserSchema['paginate']['query']),
  },
}
