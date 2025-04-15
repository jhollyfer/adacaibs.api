import { Paginated, Payload, Podcast } from '#core/entity'
import { PodcastContractRepository } from '#domain/podcast/repository'
import Model from '#infra/database/lucid/podcast/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class PodcastLucidRepository implements PodcastContractRepository {
  async create(payload: Payload<Podcast>): Promise<Podcast> {
    const podcast = await Model.create(payload)
    return this.toDomain(podcast)
  }

  async save(payload: Payload<Podcast>): Promise<Podcast> {
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

  async findById(id: string): Promise<Podcast | null> {
    const podcast = await Model.query().where('id', id).first()
    if (!podcast) return null
    return this.toDomain(podcast)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Podcast[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) =>
        q
          .whereILike('title', `%${payload?.search}%`)
          .orWhereILike('content', `%${payload?.search}%`)
      )
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map(this.toDomain)

    return { meta: json?.meta, data }
  }

  private toDomain(raw: Model | ModelObject): Podcast {
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
}
