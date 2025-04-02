import { UserRole, UserStatus } from '#core/constant'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'
  private roles = Object.values(UserRole)
  private status = Object.values(UserStatus)

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().defaultTo(this.db.knexRawQuery('uuid_generate_v4()')).primary()
      table.string('name').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('avatar').nullable()
      table
        .enu('status', this.status, {
          enumName: 'user_status',
          useNative: true,
        })
        .notNullable()
        .defaultTo(UserStatus.ACTIVE)
      table
        .enu('role', this.roles, {
          enumName: 'user_roles',
          useNative: true,
        })
        .notNullable()
        .defaultTo(UserRole.ADMINISTRATOR)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down(): Promise<void> {
    this.schema.raw('DROP TYPE IF EXISTS "user_roles" CASCADE')
    this.schema.dropTable(this.tableName)
  }
}
