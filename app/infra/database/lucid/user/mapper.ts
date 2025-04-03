import { User as Domain } from '#core/entity'
// import { UniqueEntityId } from '#core/unique-entity-id'
import Model from '#infra/database/lucid/user/model'
import { ModelObject } from '@adonisjs/lucid/types/model'

export class UserMapper {
  static toDomain(raw: Model | ModelObject): Domain {
    return {
      id: raw.id,
      email: raw.email,
      name: raw.name,
      password: raw.password,
      role: raw.role,
      status: raw.status,
      ...(raw.createdAt && { createdAt: new Date(raw.createdAt?.toJSDate()) }),
      ...(raw.updatedAt && { updatedAt: new Date(raw.updatedAt?.toJSDate()) }),
    }
  }

  static toLucid(raw: Domain): Model {
    const model = new Model()
    model.id = raw.id!
    model.name = raw.name
    model.email = raw.email
    model.password = raw.password
    model.role = raw.role
    model.status = raw.status
    // model.createdAt = DateTime.fromJSDate(new Date(raw.createdAt))
    // model.updatedAt = raw.updatedAt

    return model
  }
}
