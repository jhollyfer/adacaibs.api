import User from '#infra/database/lucid/models/user'
import { AuthenticationSchema } from '#infra/http/validators/authentication.validator'
import { cuid } from '@adonisjs/core/helpers'
import { Infer } from '@vinejs/vine/types'

type Payload = Infer<(typeof AuthenticationSchema)['send-link']['body']>

export default class AuthenticationSendLinkUseCase {
  async execute(payload: Payload): Promise<void> {
    const user = await User.query().where('email', payload.email).first()

    if (!user) throw new Error('Usuário não encontrado')

    const code = cuid()

    await user?.related('links').create({ code })

    const link = new URL('/authentication/validate-link', 'http://localhost:3333')

    link.searchParams.set('code', code)
    link.searchParams.set('redirect', 'https://adacaibs.vercel.app/admin')

    // enviar e-mail, via API ou REDIS (ou algo do tipo)

    console.log({ link: link?.toString() })

    // return link
  }
}
