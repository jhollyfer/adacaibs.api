import { UserRole } from '#core/constant'
import { PaginationQuerySchema } from '#infra/http/validators/query.validator'
import vine from '@vinejs/vine'

export const UserSchema = {
  create: {
    body: vine.object({
      name: vine.string().trim(),
      email: vine.string().trim().email(),
      role: vine.enum(UserRole),
    }),
  },
  paginate: {
    query: PaginationQuerySchema,
  },
}

export const UserValidator = {
  create: {
    body: vine.compile(UserSchema.create.body),
  },
  paginate: {
    query: vine.compile(UserSchema.paginate.query),
  },
}
