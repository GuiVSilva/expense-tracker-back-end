import nodemailer, { type Transporter } from 'nodemailer'
import type { IMailProvider } from '../IMailProvider.js'

export class EtherealMailProvider implements IMailProvider {
  private client: Transporter | null = null

  private async createClient(): Promise<Transporter> {
    if (!this.client) {
      const account = await nodemailer.createTestAccount()

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    }

    return this.client
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    const transporter = await this.createClient()

    const message = await transporter.sendMail({
      from: 'Expense Tracker <noreply@expensetracker.com.br>',
      to,
      subject,
      html: body
    })

    console.log('--------------------------------------------------')
    console.log('📧 E-mail enviado!')
    console.log('ID:', message.messageId)
    console.log(
      '🔗 Link para visualizar o e-mail:',
      nodemailer.getTestMessageUrl(message)
    )
    console.log('--------------------------------------------------')
  }
}
