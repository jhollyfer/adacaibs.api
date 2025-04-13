import { Either, left, right } from '#core/either'
import { UserContractRepository } from '#domain/user/repository'
import { inject } from '@adonisjs/core'

type Result = Either<Error, null>

@inject()
export default class UserDeleteUserCase {
  constructor(private readonly userRepository: UserContractRepository) {}
  async execute(payload: any): Promise<Result> {
    const user = await this.userRepository.findById(payload.id)
    if (!user) return left(new Error('Usuário nao encontrado'))
    await this.userRepository.delete(payload.id)
    return right(null)
  }
}
