import { Events as Domain } from '#core/entity'
import Model from '#infra/database/lucid/event/model'
import { ModelObject } from '@adonisjs/lucid/types/model'

export class EventMapper {
  static toDomain(raw: Model | ModelObject): Domain {
    return {
      id: raw.id,
      title: raw.title,
      date: raw.date,
      hour: raw.hour,
      location: raw.location,
      address: raw.address,
      category: raw.category,
      capacity: raw.capacity,
      description: raw.description,
      detailedContent: raw.detailedContent,
      cover: raw.cover,
      ...(raw.createdAt && { createdAt: new Date(raw.createdAt?.toJSDate()) }),
      ...(raw.updatedAt && { updatedAt: new Date(raw.updatedAt?.toJSDate()) }),
    }
  }

  static toLucid(raw: Domain): Model {
    const model = new Model()
    model.id = raw.id!
    model.title = raw.title
    model.date = raw.date
    model.hour = raw.hour
    model.location = raw.location
    model.address = raw.address
    model.category = raw.category
    model.capacity = raw.capacity
    model.description = raw.description
    model.detailedContent = raw.detailedContent
    model.cover = raw.cover
    // model.createdAt = raw.createdAt ? DateTime.fromJSDate(new Date(raw.createdAt)) : undefined
    // model.updatedAt = raw.updatedAt ? DateTime.fromJSDate(new Date(raw.updatedAt)) : undefined

    return model
  }
}
