import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Connecting to database and upgrading user...');
  
  const updatedUser = await prisma.user.update({
    where: { email: 'sanju@xenotrix.in' },
    data: { role: 'ADMIN' },
  });

  console.log('✅ User successfully upgraded to ADMIN:');
  console.table([{ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role }]);
}

main()
  .catch(e => {
    console.error('Error upgrading user:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
