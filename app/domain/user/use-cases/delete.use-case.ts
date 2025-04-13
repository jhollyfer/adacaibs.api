import { Either, left, right } from '#core/either'
import { UserContractRepository } from '#domain/user/repository'
import { UserSchema } from '#infra/http/validators/user.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Result = Either<Error, null>
type Payload = Infer<(typeof UserSchema)['delete']['params']>

@inject()
export default class UserDeleteUserCase {
  constructor(private readonly userRepository: UserContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const user = await this.userRepository.findById(payload.id)
    if (!user) return left(new Error('Usuário nao encontrado'))
    await this.userRepository.delete(payload.id)
    return right(null)
  }
}
