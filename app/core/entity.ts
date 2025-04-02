import { UniqueEntityId } from '#core/unique-entity-id'

export abstract class Entity<Props> {
  private _id: UniqueEntityId
  protected props: Props

  get id(): UniqueEntityId {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props
    this._id = id ?? new UniqueEntityId()
  }

  public equals(entity: Entity<any>): boolean {
    if (entity === this || entity.id === this._id) return true

    return false
  }
}
