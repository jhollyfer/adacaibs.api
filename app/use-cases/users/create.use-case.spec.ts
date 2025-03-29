import { UserRole } from '#models/enum'
import UserInMemoryRepository from '#repositories/in-memory/user'
import UserCreateUseCase from '#use-cases/users/create.use-case'
import { test } from '@japa/runner'

let userRepository: UserInMemoryRepository
let sut: UserCreateUseCase

test.group('User > Create > Use Case', (group) => {
  group.each.setup(async () => {
    userRepository = new UserInMemoryRepository()
    sut = new UserCreateUseCase(userRepository)
  })

  test('it should be able to create a user', async ({ assert }) => {
    const user = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@adacaibs.com',
      role: UserRole.ADMINISTRATOR,
    })

    assert.containsSubset(user, { name: 'John Doe', email: 'john.doe@adacaibs.com' })
  })

  test('it should not be able to create a user with same email', async ({ assert }) => {
    await sut.execute({
      name: 'John Doe',
      email: 'john.doe@adacaibs.com',
      role: UserRole.ADMINISTRATOR,
    })

    await assert.rejects(
      () =>
        sut.execute({
          name: 'John Doe',
          email: 'john.doe@adacaibs.com',
          role: UserRole.ADMINISTRATOR,
        }),
      'Usuário já cadastrado'
    )
  })
})
