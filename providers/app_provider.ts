import { AlbumContractRepository } from '#domain/album/repository'
import { EventContractRepository } from '#domain/event/repository'
import { NoticeContractRepository } from '#domain/notice/repository'
import { PodcastContractRepository } from '#domain/podcast/repository'
import { TestimonialContractRepository } from '#domain/testimonial/repository'
import { UserContractRepository } from '#domain/user/repository'
import { VideoContractRepository } from '#domain/video/repository'
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

    this.app.container.bind(UserContractRepository, () => {
      return this.app.container.make(UserLucidRepository)
    })

    const { default: NoticeLucidRepository } = await import(
      '#infra/database/lucid/notice/repository'
    )

    this.app.container.bind(NoticeContractRepository, () => {
      return this.app.container.make(NoticeLucidRepository)
    })

    const { default: EventLucidRepository } = await import('#infra/database/lucid/event/repository')

    this.app.container.bind(EventContractRepository, () => {
      return this.app.container.make(EventLucidRepository)
    })

    const { default: PodcastLucidRepository } = await import(
      '#infra/database/lucid/podcast/repository'
    )

    this.app.container.bind(PodcastContractRepository, () => {
      return this.app.container.make(PodcastLucidRepository)
    })

    const { default: VideoLucidRepository } = await import('#infra/database/lucid/video/repository')

    this.app.container.bind(VideoContractRepository, () => {
      return this.app.container.make(VideoLucidRepository)
    })

    const { default: AlbumLucidRepository } = await import('#infra/database/lucid/album/repository')

    this.app.container.bind(AlbumContractRepository, () => {
      return this.app.container.make(AlbumLucidRepository)
    })

    const { default: TestimonialLucidRepository } = await import(
      '#infra/database/lucid/testimonial/repository'
    )

    this.app.container.bind(TestimonialContractRepository, () => {
      return this.app.container.make(TestimonialLucidRepository)
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
