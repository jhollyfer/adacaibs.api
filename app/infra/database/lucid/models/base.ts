import { column, BaseModel as Root } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class BaseModel extends Root {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
