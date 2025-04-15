import { Album, Paginated, Payload } from '#core/entity'
import { AlbumContractRepository } from '#domain/album/repository'
import Model from '#infra/database/lucid/album/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class AlbumLucidRepository implements AlbumContractRepository {
  async create(payload: Payload<Album>): Promise<Album> {
    const video = await Model.create(payload)
    return this.toDomain(video)
  }

  async save(payload: Payload<Album>): Promise<Album> {
    const old = await Model.query().where('id', payload?.id!).firstOrFail()
    const updated = await old
      .merge({
        ...old?.toJSON(),
        ...payload,
      })
      .save()
    return this.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await Model.query().where('id', id).delete()
  }

  async findById(id: string): Promise<Album | null> {
    const video = await Model.query().where('id', id).first()
    if (!video) return null
    return this.toDomain(video)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Album[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) => q.whereILike('title', `%${payload?.search}%`))
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map(this.toDomain)

    return { meta: json?.meta, data }
  }

  private toDomain(raw: Model | ModelObject): Album {
    return {
      id: raw.id,
      title: raw.title,
      date: raw.date,
      description: raw.description,
      cover: raw.cover,
      images: raw.images,
      ...(raw.createdAt && { createdAt: new Date(raw.createdAt) }),
      ...(raw.updatedAt && { updatedAt: new Date(raw.updatedAt) }),
    }
  }
}
