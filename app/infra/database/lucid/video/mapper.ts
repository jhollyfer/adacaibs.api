import { Video as Domain } from '#core/entity'
import Model from '#infra/database/lucid/video/model'
import { ModelObject } from '@adonisjs/lucid/types/model'

export class VideoMapper {
  static toDomain(raw: Model | ModelObject): Domain {
    return {
      id: raw.id,
      title: raw.title,
      date: raw.date,
      duration: raw.duration,
      instructor: raw.instructor,
      url: raw.url,
      description: raw.description,
      thumbnail: raw.thumbnail,
      ...(raw.createdAt && { createdAt: new Date(raw.createdAt?.toJSDate()) }),
      ...(raw.updatedAt && { updatedAt: new Date(raw.updatedAt?.toJSDate()) }),
    }
  }

  static toLucid(raw: Domain): Model {
    const model = new Model()
    model.id = raw.id!
    model.title = raw.title
    model.date = raw.date
    model.duration = raw.duration
    model.instructor = raw.instructor
    model.url = raw.url
    model.description = raw.description
    model.thumbnail = raw.thumbnail
    // model.createdAt = DateTime.fromJSDate(new Date(raw.createdAt))
    // model.updatedAt = raw.updatedAt

    return model
  }
}
