import { Album as Domain } from '#core/entity'
import Model from '#infra/database/lucid/album/model'
import { ModelObject } from '@adonisjs/lucid/types/model'

export class AlbumMapper {
  static toDomain(raw: Model | ModelObject): Domain {
    return {
      id: raw.id,
      title: raw.title,
      date: raw.date,
      description: raw.description,
      cover: raw.cover,
      images: raw.images,
      ...(raw.createdAt && { createdAt: new Date(raw.createdAt?.toJSDate()) }),
      ...(raw.updatedAt && { updatedAt: new Date(raw.updatedAt?.toJSDate()) }),
    }
  }

  static toLucid(raw: Domain): Model {
    const model = new Model()
    model.id = raw.id!
    model.title = raw.title
    model.date = raw.date
    model.description = raw.description
    model.cover = raw.cover
    model.images = raw.images
    // model.createdAt = DateTime.fromJSDate(new Date(raw.createdAt))
    // model.updatedAt = raw.updatedAt

    return model
  }
}
