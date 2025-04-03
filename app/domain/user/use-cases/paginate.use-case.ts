import { Either, right } from '#core/either'
import { Paginated, User } from '#core/entity'
import { UserContractRepository } from '#domain/user/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { inject } from '@adonisjs/core'

type Result = Either<null, Paginated<User[]>>

@inject()
export default class UserPaginateUseCase {
  constructor(private readonly userRepository: UserContractRepository) {}

  async execute(payload: PaginationQuery): Promise<Result> {
    const paginate = await this.userRepository.paginate(payload)
    return right(paginate)
  }
}
