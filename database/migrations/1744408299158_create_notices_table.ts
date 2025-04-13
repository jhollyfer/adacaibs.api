import { NoticeCategory, NoticeStatus } from '#core/constant'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notices'
  private categories = Object.values(NoticeCategory)
  private status = Object.values(NoticeStatus)

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.knexRawQuery('uuid_generate_v4()'))

      table.string('title').notNullable()
      table
        .enu('category', this.categories, {
          enumName: 'notice_category',
          useNative: true,
        })
        .notNullable()
        .defaultTo(NoticeCategory.EDUCATION)
      table
        .enu('status', this.status, {
          enumName: 'notice_status',
          useNative: true,
        })
        .notNullable()
        .defaultTo(NoticeStatus.DRAFT)
      table.text('resume').notNullable()
      table.text('content').notNullable()
      table.string('cover').nullable() // tem que ver o bucket para colocar a imagem, ou algo assim
      table.json('tags').defaultTo('[]')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down(): Promise<void> {
    this.schema.raw('DROP TYPE IF EXISTS "notice_category" CASCADE')
    this.schema.raw('DROP TYPE IF EXISTS "notice_status" CASCADE')
    this.schema.dropTable(this.tableName)
  }
}
