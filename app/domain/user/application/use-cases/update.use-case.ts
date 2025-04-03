import { Either, left, right } from '#core/either'
import { UserContractRepository } from '#domain/user/application/repositories/user'
import { User } from '#domain/user/enterprise/entities/user'
import { UserSchema } from '#infra/http/validators/user.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Payload = Infer<(typeof UserSchema)['update']['body']>
type Result = Either<Error, User>

@inject()
export default class UserUpdateUseCase {
  constructor(private readonly userRepository: UserContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const user = await this.userRepository.findByEmail(payload.email)

    if (!user) return left(new Error('Usuário não encontrado'))

    Object.assign(user, payload)

    await this.userRepository.save(user)
    return right(user)
  }
}
