import UserPaginateUseCase from '#domain/user/use-cases/paginate.use-case'
import { UserValidator } from '#infra/http/validators/user.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserPaginateController {
  constructor(private readonly useCase: UserPaginateUseCase) {}

  /**
   * @handle
   * @tag Usuários
   * @summary Listagem Paginada de Usuários
   * @description Endpoint para listar usuários com paginação e filtro de busca
   * @paramQuery page - Número da página - @type(number) @example(1)
   * @paramQuery perPage - Itens por página - @type(number) @example(10)
   * @paramQuery search - Termo para filtragem - @type(string) @example("admin")
   * @responseBody 200 - {"meta":{"total":50,"currentPage":1,"perPage":10,"lastPage":5},"data":[{"id":"550e8400-e29b-41d4-a716-446655440000","name":"João Silva","email":"joao.silva@exemplo.com","role":"ADMINISTRATOR","avatar":"https://exemplo.com/avatar.jpg","createdAt":"2024-05-20T10:00:00.000Z","updatedAt":"2024-05-20T10:00:00.000Z"}]}
   * @responseBody 401 - {"message":"Não autorizado"}
   */

  async handle(context: HttpContext): Promise<void> {
    const validator = UserValidator['paginate']
    const {
      page = 1,
      perPage = 10,
      search,
    } = await validator['query'].validate(context.request.qs())
    const result = await this.useCase.execute({ page, perPage, search })
    return context.response.ok(result.value)
  }
}
