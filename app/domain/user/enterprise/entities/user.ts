import { UserRole, UserStatus } from '#core/constant'
import { Entity } from '#core/entity'
import { Optional } from '#core/type'
import { UniqueEntityId } from '#core/unique-entity-id'

interface Props {
  name: string
  email: string
  password: string
  role: UserRole
  status: UserStatus
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<Props> {
  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  get role(): UserRole {
    return this.props.role
  }

  get status(): UserStatus {
    return this.props.status
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined | null {
    return this.props.updatedAt
  }

  // private touch(): void {
  //   this.props.updatedAt = new Date()
  // }

  static create(props: Optional<Props, 'createdAt'>, id?: UniqueEntityId): User {
    const user = new User(
      {
        ...props,
        // attachments: props.attachments ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    // const isNewAnswer = !id

    // if (isNewAnswer) {
    //   answer.addDomainEvent(new AnswerCreatedEvent(answer))
    // }

    return user
  }

  // @column()
  // declare role: UserRole
  // @column()
  // declare status: UserStatus
  // @hasMany(() => AuthenticationLink)
  // declare links: HasMany<typeof AuthenticationLink>
  // static tokens = DbAccessTokensProvider.forModel(User)
}
