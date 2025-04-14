import { Album, Paginated } from '#core/entity'
import { AlbumContractRepository } from '#domain/album/repository'
import { AlbumMapper } from '#infra/database/lucid/album/mapper'
import Model from '#infra/database/lucid/video/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export default class AlbumLucidRepository implements AlbumContractRepository {
  async create(payload: Album): Promise<Album> {
    const parsed = AlbumMapper.toLucid(payload)
    const video = await Model.create(parsed)
    return AlbumMapper.toDomain(video)
  }

  async save(payload: Album): Promise<Album> {
    const parsed = AlbumMapper.toLucid(payload)
    const old = await Model.query().where('id', parsed.id).firstOrFail()
    const updated = await old.merge(parsed).save()
    return AlbumMapper.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await Model.query().where('id', id).delete()
  }

  async findById(id: string): Promise<Album | null> {
    const video = await Model.query().where('id', id).first()
    if (!video) return null
    return AlbumMapper.toDomain(video)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Album[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) => q.whereILike('title', payload?.search!))
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map(AlbumMapper.toDomain)

    return { meta: json?.meta, data }
  }
}
