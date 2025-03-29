import User from '#models/user'
import { UserContractRepository } from '#repositories/contract/user'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class UserLucidRepository implements UserContractRepository {
  async create(payload: any): Promise<ModelObject> {
    const user = await User.create(payload)
    return user?.toJSON()
  }
  async findByEmail(email: string): Promise<ModelObject | undefined> {
    const user = await User.query().where('email', email).first()
    return user?.toJSON()
  }
}
