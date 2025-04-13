import { UserRole, UserStatus } from '#core/constant'
import UserDeleteUserCase from '#domain/user/use-cases/delete.use-case'
import UserInMemoryRepository from '#tests/repositories/user'
import { test } from '@japa/runner'

let userRepository: UserInMemoryRepository
let sut: UserDeleteUserCase

test.group('User > Delete > Use Case', (group) => {
  group.each.setup(async () => {
    userRepository = new UserInMemoryRepository()
    sut = new UserDeleteUserCase(userRepository)
  })

  test('it should be able to delete a user', async ({ expect }) => {
    const created = await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@adacaibs.com',
      role: UserRole.ADMINISTRATOR,
      status: UserStatus.ACTIVE,
      password: '123123123',
      avatar: null,
    })

    const result = await sut.execute({ id: created.id! })
    expect(result.isRight()).toBe(true)

    const user = await userRepository.findById(created.id!)
    expect(user).toBeNull()
  })
})
