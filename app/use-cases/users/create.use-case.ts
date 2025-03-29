import { UserContractRepository } from '#repositories/contract/user'
import { UserSchema } from '#validators/user.validator'
import { inject } from '@adonisjs/core'
import hash from '@adonisjs/core/services/hash'
import { ModelObject } from '@adonisjs/lucid/types/model'
import { Infer } from '@vinejs/vine/types'

type Payload = Infer<typeof UserSchema.create.body>

@inject()
export default class UserCreateUseCase {
  constructor(private readonly userRepository: UserContractRepository) {}

  async execute(payload: Payload): Promise<ModelObject> {
    const existUser = await this.userRepository.findByEmail(payload.email)

    if (existUser) throw new Error('Usuário já cadastrado')

    const random = Math.floor(Math.random() * 1000)?.toString()
    const passwordHashed = await hash.make(random)

    const user = await this.userRepository.create({
      ...payload,
      password: passwordHashed,
    })

    return user
  }
}
