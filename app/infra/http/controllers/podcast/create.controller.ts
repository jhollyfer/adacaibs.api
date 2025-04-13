import PodcastCreateUseCase from '#domain/podcast/use-cases/create.use-case'
import { PodcastValidator } from '#infra/http/validators/podcast.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PodcastCreateController {
  constructor(private readonly useCase: PodcastCreateUseCase) {}

  /**
   * @handle
   * @tag Podcasts
   * @summary Criação de Podcast
   * @description Criação de Podcast
   * @requestBody {"email": "example@adacaibs.com", "name": "John Doe", "role": "ADMINISTRATOR"}
   * @responseBody 201 - <User>
   */

  async handle(context: HttpContext): Promise<void> {
    const validator = PodcastValidator['create']
    const payload = await validator['body'].validate(context.request.body())
    const result = await this.useCase.execute(payload)

    if (result.isLeft()) {
      const error = result.value
      return context.response.internalServerError({ message: error.message })
    }

    return context.response.created(result.value)
  }
}
