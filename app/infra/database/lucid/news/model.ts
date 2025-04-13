import BaseModel from '#infra/database/lucid/model-base'
import { column, beforeSave } from '@adonisjs/lucid/orm'
import type { NewsCategory, NewsStatus } from '#core/constant'

export default class News extends BaseModel {
  @column()
  declare title: string

  @column()
  declare category: NewsCategory

  @column()
  declare status: NewsStatus

  @column()
  declare resume: string

  @column()
  declare content: string

  @column()
  declare cover: string | null

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string) => (typeof value === 'string' ? JSON.parse(value) : value),
  })
  declare tags: string[]

  @beforeSave()
  static async prepareTags(news: News): Promise<void> {
    if (!Array.isArray(news.tags)) {
      news.tags = []
    }
  }
}
