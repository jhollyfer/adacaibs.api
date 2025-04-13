import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'videos'

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.knexRawQuery('uuid_generate_v4()'))
      table.string('title').notNullable()
      table.string('date').notNullable()
      table.string('duration').notNullable()
      table.string('instructor').notNullable()
      table.string('url').notNullable()
      table.text('description').notNullable()
      table.string('thumbnail').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}
