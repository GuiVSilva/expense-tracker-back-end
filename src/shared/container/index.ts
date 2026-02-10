import { container } from 'tsyringe'
import type { IUsersRepository } from '../../modules/users/repositories/IUsersRepository.js'
import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository.js'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
