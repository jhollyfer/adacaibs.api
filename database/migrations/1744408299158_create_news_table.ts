import { NewsCategory, NewsStatus } from '#core/constant'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'news'
  private categories = Object.values(NewsCategory)
  private status = Object.values(NewsStatus)

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.knexRawQuery('uuid_generate_v4()'))

      table.string('title').notNullable()
      table
        .enu('category', this.categories, {
          enumName: 'news_category',
          useNative: true,
        })
        .notNullable()
        .defaultTo(NewsCategory.EDUCATION)
      table
        .enu('status', this.status, {
          enumName: 'news_status',
          useNative: true,
        })
        .notNullable()
        .defaultTo(NewsStatus.DRAFT)
      table.text('resume').notNullable()
      table.text('content').notNullable()
      table.string('cover').nullable() // tem que ver o bucket para colocar a imagem, ou algo assim
      table.json('tags').defaultTo('[]')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}
