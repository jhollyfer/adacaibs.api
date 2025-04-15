import { Paginated, Payload, Video } from '#core/entity'
import { VideoContractRepository } from '#domain/video/repository'
import Model from '#infra/database/lucid/video/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class VideoLucidRepository implements VideoContractRepository {
  async create(payload: Payload<Video>): Promise<Video> {
    const video = await Model.create(payload)
    return this.toDomain(video)
  }

  async save(payload: Payload<Video>): Promise<Video> {
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

  async findById(id: string): Promise<Video | null> {
    const video = await Model.query().where('id', id).first()
    if (!video) return null
    return this.toDomain(video)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Video[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) => q.whereILike('title', `%${payload?.search}%`))
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map(this.toDomain)

    return { meta: json?.meta, data }
  }

  private toDomain(raw: Model | ModelObject): Video {
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
}
