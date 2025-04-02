import { UniqueEntityId } from '#core/unique-entity-id'
import { User as Domain } from '#domain/user/enterprise/entities/user'
import Model from '#infra/database/lucid/models/user'

export class UserMapper {
  static toDomain(raw: Model): Domain {
    return Domain.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        role: raw.role,
        status: raw.status,
        createdAt: new Date(raw.createdAt?.toJSDate()),
        ...(raw.updatedAt && { updatedAt: new Date(raw.updatedAt?.toJSDate()) }),
      },
      new UniqueEntityId(raw.id)
    )
  }

  static toLucid(raw: Domain): Model {
    const parsed = new Model()
    parsed.id = raw.id.toValue()
    parsed.name = raw.name
    parsed.email = raw.email
    parsed.password = raw.password
    parsed.role = raw.role
    parsed.status = raw.status
    return parsed
  }
}
