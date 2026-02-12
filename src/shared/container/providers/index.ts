import { container } from 'tsyringe'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider.js'
import type { IMailProvider } from './MailProvider/IMailProvider.js'

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
)
