import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'authentication_links'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().defaultTo(this.db.knexRawQuery('uuid_generate_v4()')).primary()
      table.string('code').notNullable().unique()

      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
