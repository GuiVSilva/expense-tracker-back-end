import { container } from 'tsyringe'
import './providers/index.js'
import type { IUsersRepository } from '../../modules/users/repositories/IUsersRepository.js'
import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository.js'
import { UserTokensRepository } from '../../modules/users/repositories/implementations/UserTokensRepository.js'
import type { IUserTokensRepository } from '../../modules/users/repositories/IUserTokensRepository.js'
import type { ICategoriesRepository } from '../../modules/categories/repositories/ICategoriesRepository.js'
import { CategoriesRepository } from '../../modules/categories/repositories/implementations/CategoriesRepository.js'
import { TransactionRepository } from '../../modules/transactions/repositories/implementations/TransactionRepository.js'
import type { ITransactionRepository } from '../../modules/transactions/repositories/ITransactionRepository.js'

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

container.registerSingleton<ITransactionRepository>(
  'TransactionRepository',
  TransactionRepository
)
