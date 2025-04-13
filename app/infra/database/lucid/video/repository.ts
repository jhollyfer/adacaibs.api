import { Paginated, Video } from '#core/entity'
import { VideoContractRepository } from '#domain/video/repository'
import Model from '#infra/database/lucid/video/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { VideoMapper } from './mapper.js'

export default class VideoLucidRepository implements VideoContractRepository {
  async create(payload: Video): Promise<Video> {
    const parsed = VideoMapper.toLucid(payload)
    const video = await Model.create(parsed)
    return VideoMapper.toDomain(video)
  }

  async save(payload: Video): Promise<Video> {
    const parsed = VideoMapper.toLucid(payload)
    const old = await Model.query().where('id', parsed.id).firstOrFail()
    const updated = await old.merge(parsed).save()
    return VideoMapper.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await Model.query().where('id', id).delete()
  }

  async findById(id: string): Promise<Video | null> {
    const video = await Model.query().where('id', id).first()
    if (!video) return null
    return VideoMapper.toDomain(video)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Video[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) => q.whereILike('title', payload?.search!))
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map(VideoMapper.toDomain)

    return { meta: json?.meta, data }
  }
}
