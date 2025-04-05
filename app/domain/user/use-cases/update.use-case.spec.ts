import { UserRole, UserStatus } from '#core/constant'
import UserUpdateUseCase from '#domain/user/use-cases/update.use-case'
import UserInMemoryRepository from '#tests/repositories/user'
import { test } from '@japa/runner'

let userRepository: UserInMemoryRepository
let sut: UserUpdateUseCase

test.group('User > Update > Use Case', (group) => {
  group.each.setup(async () => {
    userRepository = new UserInMemoryRepository()
    sut = new UserUpdateUseCase(userRepository)
  })

  test('it should be able to update a user', async ({ expect }) => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@adacaibs.com',
      role: UserRole.ADMINISTRATOR,
      status: UserStatus.ACTIVE,
      password: '123123123',
      avatar: null,
    })

    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe.update@adacaibs.com',
      role: UserRole.ADMINISTRATOR,
      id: user.id!,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john.doe.update@adacaibs.com',
        role: UserRole.ADMINISTRATOR,
      })
    )
  })
})
