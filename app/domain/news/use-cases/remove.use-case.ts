import { Either, left, right } from '#core/either'
import { inject } from '@adonisjs/core'
import { NewsContractRepository } from '../repository.js'

type Result = Either<Error, null>

@inject()
export default class NewsRemoveUserCase {
  constructor(private readonly newsRepository: NewsContractRepository) {}
  async execute(payload: any): Promise<Result> {
    const user = await this.newsRepository.findById(payload.id)
    if (!user) return left(new Error('Noticia não encontrada'))
    await this.newsRepository.delete(payload.id)
    return right(null)
  }
}
