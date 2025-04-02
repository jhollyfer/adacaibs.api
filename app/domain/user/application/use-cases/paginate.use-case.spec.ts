import { UserRole, UserStatus } from '#core/constant'
import { User } from '#domain/user/enterprise/entities/user'
import UserInMemoryRepository from '#tests/repositories/user'
import { test } from '@japa/runner'
import UserPaginateUseCase from './paginate.use-case.js'

let userRepository: UserInMemoryRepository
let sut: UserPaginateUseCase

test.group('User > Paginate > Use Case', (group) => {
  group.each.setup(async () => {
    userRepository = new UserInMemoryRepository()
    sut = new UserPaginateUseCase(userRepository)
  })

  test('it should be able to paginate users', async ({ expect }) => {
    for (let index = 1; index <= 22; index++) {
      const user = User.create({
        name: `John Doe ${index}`,
        email: `john.doe${index}@adacaibs.com`,
        role: UserRole.ADMINISTRATOR,
        status: UserStatus.ACTIVE,
        password: '123123123',
      })
      await userRepository.create(user)
    }

    const result = await sut.execute({
      page: 2,
      per_page: 20,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.data).toHaveLength(2)
  })
})
