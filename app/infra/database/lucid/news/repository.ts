import { News, Paginated } from '#core/entity'
import { NewsContractRepository } from '#domain/news/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { NewsMapper } from './mapper.js'
import Model from '#infra/database/lucid/news/model'

export default class NewsLucidRepository implements NewsContractRepository {
  async create(payload: News): Promise<News> {
    const parsed = NewsMapper.toLucid(payload)
    const news = await Model.create(parsed)
    return NewsMapper.toDomain(news)
  }

  async save(payload: News): Promise<News> {
    const parsed = NewsMapper.toLucid(payload)
    const old = await Model.query().where('id', parsed.id).firstOrFail()
    const updated = await old.merge(parsed).save()
    return NewsMapper.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await Model.query().where('id', id).delete()
  }

  async findById(id: string): Promise<News | null> {
    const news = await Model.query().where('id', id).first()
    if (!news) return null
    return NewsMapper.toDomain(news)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<News[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) =>
        q
          .whereILike('title', payload?.search!)
          .orWhereILike('resume', payload?.search!)
          .orWhereILike('content', payload?.search!)
      )
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map((item) => NewsMapper.toDomain(item))

    return { meta: json?.meta, data }
  }
}
