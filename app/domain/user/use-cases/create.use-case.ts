import { UserStatus } from '#core/constant'
import { Either, left, right } from '#core/either'
import { User } from '#core/entity'
import { UserContractRepository } from '#domain/user/repository'
import { UserSchema } from '#infra/http/validators/user.validator'
import { inject } from '@adonisjs/core'
import hash from '@adonisjs/core/services/hash'
import { Infer } from '@vinejs/vine/types'

type Payload = Infer<(typeof UserSchema)['create']['body']>

type Result = Either<Error, User>

@inject()
export default class UserCreateUseCase {
  constructor(private readonly userRepository: UserContractRepository) {}

  async execute(payload: Payload): Promise<Result> {
    const existUser = await this.userRepository.findByEmail(payload.email)

    if (existUser) return left(new Error('Usuário já cadastrado'))

    const random = Math.floor(Math.random() * 1000)?.toString()
    const passwordHashed = await hash.make(random)

    const user: User = {
      ...payload,
      password: passwordHashed,
      status: UserStatus.ACTIVE,
    }

    await this.userRepository.create(user)
    return right(user)
  }
}
