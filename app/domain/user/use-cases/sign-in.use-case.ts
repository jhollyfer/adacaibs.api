import { Either, left, right } from '#core/either'
import { UserContractRepository } from '#domain/user/repository'
import { UserSchema } from '#infra/http/validators/user.validator'
import { inject } from '@adonisjs/core'
import hash from '@adonisjs/core/services/hash'
import { Infer } from '@vinejs/vine/types'

type Payload = Infer<(typeof UserSchema)['sign-in']['body']>
type Result = Either<Error, { token: string }>

@inject()
export default class UserSignInUseCase {
  constructor(private readonly userRepository: UserContractRepository) {}

  async execute(payload: Payload): Promise<Result> {
    const user = await this.userRepository.findByEmail(payload.email)

    if (!user) return left(new Error('Credencial inválida'))

    const isMatchPassword = await hash.verify(user.password, payload.password)

    if (!isMatchPassword) return left(new Error('Credencial inválida'))

    const { token } = await this.userRepository.authenticate(user)

    if (!token) return left(new Error('Erro ao gerar token'))

    return right({ token })
  }
}
