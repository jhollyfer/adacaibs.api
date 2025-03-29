import { UserRole } from '#models/enum'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run(): Promise<void> {
    const user = new User()

    user.name = 'Administrador'
    user.email = 'administrador@adacaibs.com'
    user.password = '10203040'
    user.role = UserRole.ADMINISTRATOR

    await user.save()
  }
}
