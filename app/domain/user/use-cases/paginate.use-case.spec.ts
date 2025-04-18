import { UserRole, UserStatus } from '#core/constant'
import { User } from '#core/entity'
import UserPaginateUseCase from '#domain/user/use-cases/paginate.use-case'
import UserInMemoryRepository from '#tests/repositories/user'
import { test } from '@japa/runner'

let userRepository: UserInMemoryRepository
let sut: UserPaginateUseCase

test.group('User > Paginate > Use Case', (group) => {
  group.each.setup(async () => {
    userRepository = new UserInMemoryRepository()
    sut = new UserPaginateUseCase(userRepository)
  })

  test('it should be able to paginate users', async ({ expect }) => {
    for (let index = 1; index <= 22; index++) {
      const user: User = {
        name: `John Doe ${index}`,
        email: `john.doe${index}@adacaibs.com`,
        role: UserRole.ADMINISTRATOR,
        status: UserStatus.ACTIVE,
        password: '123123123',
        avatar: null,
      }
      await userRepository.create(user)
    }

    const result = await sut.execute({
      page: 2,
      perPage: 20,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.data).toHaveLength(2)
  })
})
