import PodcastUpdateUseCase from '#domain/podcast/use-cases/update.use-case'
import { PodcastValidator } from '#infra/http/validators/podcast.validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class PodcastUpdateController {
  constructor(private readonly useCase: PodcastUpdateUseCase) {}

  async handle(context: HttpContext): Promise<void> {
    const validator = PodcastValidator['update']
    const body = await validator['body'].validate(context.request.body())
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...body, ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Podcast não encontrado':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.ok(result.value)
  }
}
