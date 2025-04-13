import type { NoticeCategory, NoticeStatus } from '#core/constant'
import BaseModel from '#infra/database/lucid/model-base'
import { beforeSave, column } from '@adonisjs/lucid/orm'

export default class Notice extends BaseModel {
  @column()
  declare title: string

  @column()
  declare category: NoticeCategory

  @column()
  declare status: NoticeStatus

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
  static async prepareTags(notice: Notice): Promise<void> {
    if (!Array.isArray(notice.tags)) {
      notice.tags = []
    }
  }
}
