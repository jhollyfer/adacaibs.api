import BaseModel from '#infra/database/lucid/model-base'
import { beforeSave, column } from '@adonisjs/lucid/orm'
export default class Album extends BaseModel {
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

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string) => (typeof value === 'string' ? JSON.parse(value) : value),
  })
  declare images: string[]

  @beforeSave()
  static async prepareImages(album: Album): Promise<void> {
    if (!Array.isArray(album.images)) {
      album.images = []
    }
  }
}
