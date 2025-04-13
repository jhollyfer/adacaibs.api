import { EventsContractRepository } from '#domain/event/repository'
import { NewsContractRepository } from '#domain/news/repository'
import { PodcastContractRepository } from '#domain/podcast/repository'
import { UserContractRepository } from '#domain/user/repository'
import { VideoContractRepository } from '#domain/video/repository'
import VideoLucidRepository from '#infra/database/lucid/video/repository'
import type { ApplicationService } from '@adonisjs/core/types'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register(): void {}

  /**
   * The container bindings have booted
   */
  async boot(): Promise<void> {
    const { default: UserLucidRepository } = await import('#infra/database/lucid/user/repository')
    const { default: NewsLucidRepository } = await import('#infra/database/lucid/news/repository')
    const { default: EventsLucidRepository } = await import(
      '#infra/database/lucid/event/repository'
    )
    const { default: PodcastLucidRepository } = await import(
      '#infra/database/lucid/podcast/repository'
    )

    this.app.container.bind(UserContractRepository, () => {
      return this.app.container.make(UserLucidRepository)
    })
    this.app.container.bind(NewsContractRepository, () => {
      return this.app.container.make(NewsLucidRepository)
    })
    this.app.container.bind(EventsContractRepository, () => {
      return this.app.container.make(EventsLucidRepository)
    })
    this.app.container.bind(PodcastContractRepository, () => {
      return this.app.container.make(PodcastLucidRepository)
    })
    this.app.container.bind(VideoContractRepository, () => {
      return this.app.container.make(VideoLucidRepository)
    })
  }

  /**
   * The application has been booted
   */
  async start(): Promise<void> {}

  /**
   * The process has been started
   */
  async ready(): Promise<void> {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown(): Promise<void> {}
}
