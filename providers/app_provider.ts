import { UserContractRepository } from '#repositories/contract/user'
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
    const { default: UserLucidRepository } = await import('#repositories/lucid/user')

    this.app.container.bind(UserContractRepository, () => {
      return this.app.container.make(UserLucidRepository)
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
