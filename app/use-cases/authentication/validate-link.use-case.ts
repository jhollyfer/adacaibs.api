import AuthenticationLink from '#models/authentication-link'
import User from '#models/user'
import { AuthenticationSchema } from '#validators/authentication.validator'
import { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'

type Payload = Infer<(typeof AuthenticationSchema)['validate-link']['query']>

export default class AuthenticationValidateLinkUseCase {
  async execute(payload: Payload): Promise<{
    redirect: string
    token: string
  }> {
    const link = await AuthenticationLink.query().where('code', payload.code).first()

    if (!link) throw new Error('Link não encontrado')

    const daysSinceAuthenticationLinkWasCreated = DateTime.now().diff(link.createdAt, 'days').days

    if (daysSinceAuthenticationLinkWasCreated > 7)
      throw new Error('Link expirado, por favor solicite um novo link')

    const user = await link?.related('user').query().firstOrFail()

    const userToken = await User.tokens.create(user)
    const token = userToken?.toJSON().token

    if (!token) throw new Error('Erro ao gerar token')

    await link?.delete()

    return {
      redirect: payload.redirect,
      token,
    }
  }
}
