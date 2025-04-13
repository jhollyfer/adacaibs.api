import { EventCategory } from '#core/constant'
import BaseModel from '#infra/database/lucid/model-base'
import { column } from '@adonisjs/lucid/orm'

// tive que mudar de event para events, pq tem uma propriedade do próprio js que pode acabar confundindo futuramente
export default class Events extends BaseModel {
  @column()
  declare title: string

  @column()
  declare date: string

  @column()
  declare hour: string

  @column()
  declare location: string

  @column()
  declare address: string

  @column()
  declare category: EventCategory

  @column()
  declare capacity: number

  @column()
  declare description: string

  @column()
  declare detailedContent: string

  @column()
  declare cover: string | null
}
