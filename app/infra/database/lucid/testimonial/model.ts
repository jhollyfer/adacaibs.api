import { TestimonialStatus } from '#core/constant'
import BaseModel from '#infra/database/lucid/model-base'
import { column } from '@adonisjs/lucid/orm'

export default class Testimonial extends BaseModel {
  @column()
  declare name: string

  @column()
  declare position: string

  @column()
  declare rating: string

  @column()
  declare testimonial: string

  @column()
  declare photo: string | null

  @column()
  declare status: TestimonialStatus
}
