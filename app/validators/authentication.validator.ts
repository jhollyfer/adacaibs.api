import vine from '@vinejs/vine'

export const AuthenticationSchema = {
  'send-link': {
    body: vine.object({
      email: vine.string().trim().email(),
    }),
  },
  'validate-link': {
    query: vine.object({
      code: vine.string().trim(),
      redirect: vine.string().trim().url(),
    }),
  },
} as const

export const AuthenticationValidator = {
  'send-link': {
    body: vine.compile(AuthenticationSchema['send-link'].body),
  },
  'validate-link': {
    query: vine.compile(AuthenticationSchema['validate-link'].query),
  },
} as const
