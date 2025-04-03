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
    }),
  },
  'update': {
    body: vine.object({
      name: vine.string().trim().optional(),
      email: vine.string().trim().email(),
      role: vine.enum(UserRole).optional(),
    }),
  },
  'paginate': {
    query: PaginationQuerySchema,
  },
}

export const UserValidator = {
  'sign-in': {
    body: vine.compile(UserSchema['sign-in'].body),
  },
  'create': {
    body: vine.compile(UserSchema.create.body),
  },
  'paginate': {
    query: vine.compile(UserSchema.paginate.query),
  },
}
