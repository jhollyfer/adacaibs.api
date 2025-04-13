import { NewsContractRepository } from '#domain/news/repository'
import { UserContractRepository } from '#domain/user/repository'
import NewsLucidRepository from '#infra/database/lucid/news/repository'
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
    this.app.container.bind(NewsContractRepository, () => {
      return this.app.container.make(NewsLucidRepository)
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
