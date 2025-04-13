import { Paginated, Podcast } from '#core/entity'
import { PodcastContractRepository } from '#domain/podcast/repository'
import { PodcastMapper } from '#infra/database/lucid/podcast/mapper'
import Model from '#infra/database/lucid/podcast/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export default class PodcastLucidRepository implements PodcastContractRepository {
  async create(payload: Podcast): Promise<Podcast> {
    const parsed = PodcastMapper.toLucid(payload)
    const podcast = await Model.create(parsed)
    return PodcastMapper.toDomain(podcast)
  }

  async save(payload: Podcast): Promise<Podcast> {
    const parsed = PodcastMapper.toLucid(payload)
    const old = await Model.query().where('id', parsed.id).firstOrFail()
    const updated = await old.merge(parsed).save()
    return PodcastMapper.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await Model.query().where('id', id).delete()
  }

  async findById(id: string): Promise<Podcast | null> {
    const podcast = await Model.query().where('id', id).first()
    if (!podcast) return null
    return PodcastMapper.toDomain(podcast)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Podcast[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) =>
        q.whereILike('title', payload?.search!).orWhereILike('content', payload?.search!)
      )
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map(PodcastMapper.toDomain)

    return { meta: json?.meta, data }
  }
}
