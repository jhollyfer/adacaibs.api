import { Either, left, right } from '#core/either'
import { NewsContractRepository } from '#domain/news/repository'
import { NewsSchema } from '#infra/http/validators/news.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Result = Either<Error, null>
type Payload = Infer<(typeof NewsSchema)['delete']['params']>
@inject()
export default class NewsDeleteUserCase {
  constructor(private readonly newsRepository: NewsContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const user = await this.newsRepository.findById(payload.id)
    if (!user) return left(new Error('Noticia não encontrada'))
    await this.newsRepository.delete(payload.id)
    return right(null)
  }
}
