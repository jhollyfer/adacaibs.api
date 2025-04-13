import { Notice, Paginated } from '#core/entity'
import { NoticeContractRepository } from '#domain/notice/repository'
import { NoticeMapper } from '#infra/database/lucid/notice/mapper'
import Model from '#infra/database/lucid/notice/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export default class NoticeLucidRepository implements NoticeContractRepository {
  async create(payload: Notice): Promise<Notice> {
    const parsed = NoticeMapper.toLucid(payload)
    const notice = await Model.create(parsed)
    return NoticeMapper.toDomain(notice)
  }

  async save(payload: Notice): Promise<Notice> {
    const parsed = NoticeMapper.toLucid(payload)
    const old = await Model.query().where('id', parsed.id).firstOrFail()
    const updated = await old.merge(parsed).save()
    return NoticeMapper.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await Model.query().where('id', id).delete()
  }

  async findById(id: string): Promise<Notice | null> {
    const notice = await Model.query().where('id', id).first()
    if (!notice) return null
    return NoticeMapper.toDomain(notice)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Notice[]>> {
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

    const data = json?.data?.map(NoticeMapper.toDomain)

    return { meta: json?.meta, data }
  }
}
