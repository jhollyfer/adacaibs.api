import swagger from '#config/swagger'
import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import AutoSwagger from 'adonis-autoswagger'
export default class DocsGenerate extends BaseCommand {
  static commandName = 'docs:generate'

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  async run(): Promise<void> {
    const Router = await this.app.container.make('router')
    Router.commit()
    await AutoSwagger.default.writeFile(Router.toJSON(), swagger)
  }
}
