import BaseModel from '#infra/database/lucid/model-base'
import { beforeSave, column } from '@adonisjs/lucid/orm'

export default class Podcast extends BaseModel {
  @column()
  declare title: string

  @column()
  declare date: string

  @column()
  declare duration: string

  @column()
  declare description: string

  @column()
  declare cover: string | null

  @column()
  declare content: string | null

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string) => (typeof value === 'string' ? JSON.parse(value) : value),
  })
  declare presenters: string[]

  @beforeSave()
  static async preparePresenters(podcast: Podcast): Promise<void> {
    if (!Array.isArray(podcast.presenters)) {
      podcast.presenters = []
    }
  }

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string) => (typeof value === 'string' ? JSON.parse(value) : value),
  })
  declare guests: string[]

  @beforeSave()
  static async prepareGuests(podcast: Podcast): Promise<void> {
    if (!Array.isArray(podcast.guests)) {
      podcast.guests = []
    }
  }
}
