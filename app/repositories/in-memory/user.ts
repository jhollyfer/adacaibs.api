import User from '#models/user'
import { UserContractRepository } from '#repositories/contract/user'
import { ModelObject } from '@adonisjs/lucid/types/model'
import { randomUUID } from 'node:crypto'

export default class UserInMemoryRepository implements UserContractRepository {
  public users: ModelObject[] = []

  async create(payload: any): Promise<ModelObject> {
    const user = new User()
    const id = randomUUID()
    Object.assign(user, {
      id,
      ...payload,
    })
    this.users.push(user?.toJSON())
    return user?.toJSON()
  }

  async findByEmail(email: string): Promise<ModelObject | undefined> {
    return this.users.find((user) => user.email === email)
  }
}
