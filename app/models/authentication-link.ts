import BaseModel from '#models/base'
import User from '#models/user'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class AuthenticationLink extends BaseModel {
  @column()
  declare code: string

  @column({
    columnName: 'user_id',
    serializeAs: 'user_id',
  })
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
