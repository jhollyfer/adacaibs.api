import { UserRole, UserStatus } from '#core/constant'
import UserCreateUseCase from '#domain/user/application/use-cases/create.use-case'
import UserInMemoryRepository from '#tests/repositories/user'
import { test } from '@japa/runner'

let userRepository: UserInMemoryRepository
let sut: UserCreateUseCase

test.group('User > Create > Use Case', (group) => {
  group.each.setup(async () => {
    userRepository = new UserInMemoryRepository()
    sut = new UserCreateUseCase(userRepository)
  })

  test('it should be able to create a user', async ({ expect }) => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@adacaibs.com',
      role: UserRole.ADMINISTRATOR,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john.doe@adacaibs.com',
        role: UserRole.ADMINISTRATOR,
        status: UserStatus.ACTIVE,
      })
    )
  })

  test('it should not be able to create a user with same email', async ({ expect }) => {
    await sut.execute({
      name: 'John Doe',
      email: 'john.doe@adacaibs.com',
      role: UserRole.ADMINISTRATOR,
    })

    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@adacaibs.com',
      role: UserRole.ADMINISTRATOR,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(Error)
  })
})
