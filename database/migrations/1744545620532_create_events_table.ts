import { EventCategory } from '#core/constant'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'events'
  private categories = Object.values(EventCategory)

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.knexRawQuery('uuid_generate_v4()'))
      table.string('title').notNullable()
      table.string('date').notNullable()
      table.string('hour').notNullable()
      table.string('location').notNullable()
      table.string('address').notNullable()
      table
        .enu('category', this.categories, {
          enumName: 'event_category',
          useNative: true,
        })
        .notNullable()
        .defaultTo(EventCategory.ART)
      table.integer('capacity').unsigned().notNullable()
      table.text('description').notNullable()
      table.text('detailed_content').notNullable()
      table.string('cover').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}
