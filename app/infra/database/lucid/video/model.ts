import BaseModel from '#infra/database/lucid/model-base'
import { column } from '@adonisjs/lucid/orm'

export default class Video extends BaseModel {
  @column()
  declare title: string

  @column()
  declare date: string

  @column()
  declare duration: string

  @column()
  declare instructor: string

  @column()
  declare url: string

  @column()
  declare description: string

  @column()
  declare thumbnail: string | null
}
