import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')
  
  // Create Categories
  const catElectronics = await prisma.category.create({ data: { name: 'Electronics' } })
  const catAccessories = await prisma.category.create({ data: { name: 'Accessories' } })
  const catFurniture = await prisma.category.create({ data: { name: 'Furniture' } })
  const catClothing = await prisma.category.create({ data: { name: 'Clothing' } })
  const catSports = await prisma.category.create({ data: { name: 'Sports' } })

  console.log('Categories created.')

  const productsData = [
    { name: "Premium Wireless Headphones", description: "Experience pure, unadulterated sound with our Premium Wireless Headphones. Featuring industry-leading active noise cancellation, 30-hour battery life, and unparalleled comfort for all-day listening.", price: 14999, discountPrice: 12999, categoryId: catElectronics.id, images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80", "https://images.unsplash.com/photo-1487215078519-e21eb04c8d3b?w=800&q=80"], sku: "EL-001", stockQuantity: 50 },
    { name: "Minimalist Leather Watch", description: "A sleek and elegant watch for any occasion.", price: 8999, categoryId: catAccessories.id, images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"], sku: "AC-001", stockQuantity: 30 },
    { name: "Smart Fitness Tracker", description: "Track your fitness goals with precision.", price: 4999, discountPrice: 3999, categoryId: catElectronics.id, images: ["https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80"], sku: "EL-002", stockQuantity: 100 },
    { name: "Ergonomic Office Chair", description: "Comfortable chair for long working hours.", price: 12500, categoryId: catFurniture.id, images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80"], sku: "FU-001", stockQuantity: 20 },
    { name: "Classic Cotton T-Shirt", description: "100% premium cotton t-shirt.", price: 1299, categoryId: catClothing.id, images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"], sku: "CL-001", stockQuantity: 200 },
    { name: "Stainless Steel Water Bottle", description: "Keep your drinks cold for 24 hours.", price: 999, categoryId: catSports.id, images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"], sku: "SP-001", stockQuantity: 150 },
  ]

  for (const p of productsData) {
    await prisma.product.create({
      data: p
    })
  }
  
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
