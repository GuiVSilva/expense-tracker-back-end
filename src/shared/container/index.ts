import { container } from 'tsyringe'
import './providers/index.js'
import type { IUsersRepository } from '../../modules/users/repositories/IUsersRepository.js'
import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository.js'
import { UserTokensRepository } from '../../modules/users/repositories/implementations/UserTokensRepository.js'
import type { IUserTokensRepository } from '../../modules/users/repositories/IUserTokensRepository.js'
import type { ICategoriesRepository } from '../../modules/categories/repositories/ICategoriesRepository.js'
import { CategoriesRepository } from '../../modules/categories/repositories/implementations/CategoriesRepository.js'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
)
