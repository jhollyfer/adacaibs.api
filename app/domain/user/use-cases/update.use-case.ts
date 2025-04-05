import { Either, left, right } from '#core/either'
import { User } from '#core/entity'
import { UserContractRepository } from '#domain/user/repository'
import { UserSchema } from '#infra/http/validators/user.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Body = Infer<(typeof UserSchema)['update']['body']>
type Params = Infer<(typeof UserSchema)['update']['params']>
interface Payload extends Body, Params {}
type Result = Either<Error, User>

@inject()
export default class UserUpdateUseCase {
  constructor(private readonly userRepository: UserContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const user = await this.userRepository.findById(payload.id)

    if (!user) return left(new Error('Usuário não encontrado'))

    Object.assign(user, payload)

    await this.userRepository.save(user)
    return right(user)
  }
}
