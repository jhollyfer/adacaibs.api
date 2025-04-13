import { Notice as Domain } from '#core/entity'
import Model from '#infra/database/lucid/notice/model'
import { ModelObject } from '@adonisjs/lucid/types/model'

export class NoticeMapper {
  static toDomain(raw: Model | ModelObject): Domain {
    return {
      id: raw.id,
      title: raw.title,
      category: raw.category,
      status: raw.status,
      resume: raw.resume,
      content: raw.content,
      cover: raw.cover,
      tags: raw.tags,
      ...(raw.createdAt && { createdAt: new Date(raw.createdAt?.toJSDate()) }),
      ...(raw.updatedAt && { updatedAt: new Date(raw.updatedAt?.toJSDate()) }),
    }
  }

  static toLucid(raw: Domain): Model {
    const model = new Model()
    model.id = raw.id!
    model.title = raw.title
    model.category = raw.category
    model.status = raw.status
    model.resume = raw.resume
    model.content = raw.content
    model.cover = raw.cover
    model.tags = raw.tags || []
    // model.createdAt = raw.createdAt ? DateTime.fromJSDate(new Date(raw.createdAt)) : undefined
    // model.updatedAt = raw.updatedAt ? DateTime.fromJSDate(new Date(raw.updatedAt)) : undefined

    return model
  }
}
