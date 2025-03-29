import { UserRole } from '#models/enum'
import vine from '@vinejs/vine'

export const UserSchema = {
  create: {
    body: vine.object({
      name: vine.string().trim(),
      email: vine.string().trim().email(),
      role: vine.enum(UserRole),
    }),
  },
}

export const UserValidator = {
  create: {
    body: vine.compile(UserSchema.create.body),
  },
}
