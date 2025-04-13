import { Podcast as Domain } from '#core/entity'
import Model from '#infra/database/lucid/podcast/model'
import { ModelObject } from '@adonisjs/lucid/types/model'

export class PodcastMapper {
  static toDomain(raw: Model | ModelObject): Domain {
    return {
      id: raw.id,
      date: raw.date,
      content: raw.content,
      presenters: raw.presenters,
      guests: raw.guests,
      description: raw.description,
      cover: raw.cover,
      duration: raw.duration,
      title: raw.title,
      ...(raw.createdAt && { createdAt: new Date(raw.createdAt?.toJSDate()) }),
      ...(raw.updatedAt && { updatedAt: new Date(raw.updatedAt?.toJSDate()) }),
    }
  }

  static toLucid(raw: Domain): Model {
    const model = new Model()
    model.id = raw.id!
    model.date = raw.date
    model.content = raw.content
    model.presenters = raw.presenters
    model.guests = raw.guests
    model.description = raw.description
    model.cover = raw.cover
    model.duration = raw.duration
    model.title = raw.title
    // model.createdAt = DateTime.fromJSDate(new Date(raw.createdAt))
    // model.updatedAt = raw.updatedAt

    return model
  }
}
