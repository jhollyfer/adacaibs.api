import { UserRole, UserStatus } from '#core/constant'
import UserRemoveUserCase from '#domain/user/use-cases/remove.use-case'
import UserInMemoryRepository from '#tests/repositories/user'
import { test } from '@japa/runner'

let userRepository: UserInMemoryRepository
let sut: UserRemoveUserCase

test.group('User > Remove > Use Case', (group) => {
  group.each.setup(async () => {
    userRepository = new UserInMemoryRepository()
    sut = new UserRemoveUserCase(userRepository)
  })

  test('it should be able to remove a user', async ({ expect }) => {
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
