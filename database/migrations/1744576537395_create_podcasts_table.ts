import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'podcasts'

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('date').notNullable()
      table.string('duration').notNullable()
      table.string('presenters').notNullable()
      table.string('guests').notNullable()
      table.string('description').notNullable()
      table.string('cover').nullable()
      table.text('content').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}
