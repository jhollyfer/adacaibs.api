import { TestimonialStatus } from '#core/constant'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'testimonials'
  private statuses = Object.values(TestimonialStatus)

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.knexRawQuery('uuid_generate_v4()'))
      table.string('name').notNullable()
      table.string('position').notNullable()
      table.string('rating').notNullable()
      table.text('testimonial').notNullable()
      table.string('photo').nullable()
      table
        .enu('status', this.statuses, {
          enumName: 'testimonial_status',
          useNative: true,
        })
        .notNullable()
        .defaultTo(TestimonialStatus.PENDING)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down(): Promise<void> {
    this.schema.raw('DROP TYPE IF EXISTS "testimonial_status" CASCADE')
    this.schema.dropTable(this.tableName)
  }
}
