import { UserRole, UserStatus } from '#core/constant'
import { User } from '#core/entity'
import UserSignInUseCase from '#domain/user/use-cases/sign-in.use-case'
import UserInMemoryRepository from '#tests/repositories/user'
import hash from '@adonisjs/core/services/hash'
import { test } from '@japa/runner'
import { randomUUID } from 'node:crypto'

let userRepository: UserInMemoryRepository
let sut: UserSignInUseCase

test.group('User > Sign In > Use Case', (group) => {
  group.each.setup(async () => {
    userRepository = new UserInMemoryRepository()
    sut = new UserSignInUseCase(userRepository)
  })

  test('it should be able to sign in', async ({ expect }) => {
    const hashedPassword = await hash.make('10203040')

    const user: User = {
      id: randomUUID(),
      name: 'John Doe',
      email: 'john.doe@adacaibs.com',
      role: UserRole.ADMINISTRATOR,
      status: UserStatus.ACTIVE,
      password: hashedPassword,
      avatar: null,
    }

    await userRepository.create(user)

    const result = await sut.execute({
      email: 'john.doe@adacaibs.com',
      password: '10203040',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    )
  })
})
