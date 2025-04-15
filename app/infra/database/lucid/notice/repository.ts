import { Notice, Paginated, Payload } from '#core/entity'
import { NoticeContractRepository } from '#domain/notice/repository'

import Model from '#infra/database/lucid/notice/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class NoticeLucidRepository implements NoticeContractRepository {
  async create(payload: Payload<Notice>): Promise<Notice> {
    const notice = await Model.create(payload)
    return this.toDomain(notice)
  }

  async save(payload: Payload<Notice>): Promise<Notice> {
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

  async findById(id: string): Promise<Notice | null> {
    const notice = await Model.query().where('id', id).first()
    if (!notice) return null
    return this.toDomain(notice)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Notice[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) =>
        q
          .whereILike('title', `%${payload?.search}%`)
          .orWhereILike('resume', `%${payload?.search}%`)
          .orWhereILike('content', `%${payload?.search}%`)
      )
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map(this.toDomain)

    return { meta: json?.meta, data }
  }

  private toDomain(raw: Model | ModelObject): Notice {
    return {
      id: raw.id,
      title: raw.title,
      category: raw.category,
      status: raw.status,
      resume: raw.resume,
      content: raw.content,
      cover: raw.cover,
      tags: raw.tags,
      ...(raw.createdAt && { createdAt: new Date(raw.createdAt?.toJSDate()) }),
      ...(raw.updatedAt && { updatedAt: new Date(raw.updatedAt?.toJSDate()) }),
    }
  }
}
