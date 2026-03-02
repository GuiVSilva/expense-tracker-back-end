import { seedCategories } from './seeds/categories.seed'

async function main() {
  await seedCategories()
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Seed error:', error)
    process.exit(1)
  })
