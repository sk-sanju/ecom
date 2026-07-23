import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultOffers = [
  { title: "Up to 60% off | Appliances", link: "/shop", images: ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&q=80", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80", "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&q=80", "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&q=80"] },
  { title: "Revamp your home in style", link: "/shop", images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80", "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400&q=80", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80"] },
  { title: "Starting ₹99 | Toys & Baby", link: "/shop", images: ["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80", "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&q=80", "https://images.unsplash.com/photo-1558060370-d64111d20104?w=400&q=80", "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80"] },
  { title: "Up to 70% off | Clearance", link: "/shop", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"] }
];

async function main() {
  console.log("Seeding default offers...");
  for (const offer of defaultOffers) {
    await prisma.offerCard.create({
      data: {
        title: offer.title,
        link: offer.link,
        images: offer.images
      }
    });
  }
  console.log("Successfully seeded offers.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
