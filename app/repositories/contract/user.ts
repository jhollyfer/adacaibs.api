import { ModelObject } from '@adonisjs/lucid/types/model'

export abstract class UserContractRepository {
  abstract create(payload: any): Promise<ModelObject>
  abstract findByEmail(email: string): Promise<ModelObject | undefined>
}
