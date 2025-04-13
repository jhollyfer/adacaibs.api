import { Testimonial as Domain } from '#core/entity'
import Model from '#infra/database/lucid/testimonial/model'
import { ModelObject } from '@adonisjs/lucid/types/model'

export class TestimonialMapper {
  static toDomain(raw: Model | ModelObject): Domain {
    return {
      id: raw.id,
      name: raw.name,
      position: raw.position,
      rating: raw.rating,
      testimonial: raw.testimonial,
      photo: raw.photo,
      status: raw.status,
      ...(raw.createdAt && { createdAt: new Date(raw.createdAt?.toJSDate()) }),
      ...(raw.updatedAt && { updatedAt: new Date(raw.updatedAt?.toJSDate()) }),
    }
  }

  static toLucid(raw: Domain): Model {
    const model = new Model()
    model.id = raw.id!
    model.name = raw.name
    model.position = raw.position
    model.rating = raw.rating
    model.testimonial = raw.testimonial
    model.photo = raw.photo
    model.status = raw.status
    // model.createdAt = DateTime.fromJSDate(new Date(raw.createdAt))
    // model.updatedAt = raw.updatedAt

    return model
  }
}
