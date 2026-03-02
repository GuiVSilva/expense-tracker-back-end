import { prisma } from '../../lib/prisma.js'

export async function seedCategories() {
  await prisma.categories.createMany({
    data: [
      { name: 'Moradia' },
      { name: 'Alimentação' },
      { name: 'Transporte' },
      { name: 'Saúde' },
      { name: 'Educação' },
      { name: 'Lazer' },
      { name: 'Aluguel' },
      { name: 'Despesas Pessoais' },
      { name: 'Impostos' },
      { name: 'Salário' },
      { name: 'Celular/TV/Internet' },
      { name: 'Renda extra' },
      { name: 'Investimentos' },
      { name: 'Outros' }
    ],
    skipDuplicates: true
  })
}
