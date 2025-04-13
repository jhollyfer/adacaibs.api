import { AlbumContractRepository } from '#domain/album/repository'
import { EventsContractRepository } from '#domain/event/repository'
import { NewsContractRepository } from '#domain/news/repository'
import { PodcastContractRepository } from '#domain/podcast/repository'
import { TestimonialContractRepository } from '#domain/testimonial/repository'
import { UserContractRepository } from '#domain/user/repository'
import { VideoContractRepository } from '#domain/video/repository'
<<<<<<< HEAD
=======
import TestimonialLucidRepository from '#infra/database/lucid/testimonial/repository'
import VideoLucidRepository from '#infra/database/lucid/video/repository'
>>>>>>> fb7eb1d (fix: autoswagger problem)
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

    const { default: NewsLucidRepository } = await import('#infra/database/lucid/news/repository')

    this.app.container.bind(NewsContractRepository, () => {
      return this.app.container.make(NewsLucidRepository)
    })

    const { default: EventsLucidRepository } = await import(
      '#infra/database/lucid/event/repository'
    )

    this.app.container.bind(EventsContractRepository, () => {
      return this.app.container.make(EventsLucidRepository)
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
<<<<<<< HEAD

    const { default: AlbumLucidRepository } = await import('#infra/database/lucid/album/repository')

    this.app.container.bind(AlbumContractRepository, () => {
      return this.app.container.make(AlbumLucidRepository)
=======
    this.app.container.bind(TestimonialContractRepository, () => {
      return this.app.container.make(TestimonialLucidRepository)
>>>>>>> fb7eb1d (fix: autoswagger problem)
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
