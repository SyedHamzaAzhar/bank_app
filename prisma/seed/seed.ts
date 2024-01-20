import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
const logger: Logger = new Logger("Seed");

async function main() {
    await prisma.user.deleteMany()
  logger.log("Seeding...");


  const salt = await bcrypt.genSalt();
  const admin_user = {
    firstName: "admin",
    lastName: "user",
    email:'admin@mailinator.com',
    password: await bcrypt.hash("Admin123", salt),
    phoneNumber:'+1564327819',
    address:'926 MAIN ST NASHVILLE, TN 37206-3614 United State'

  };
    
    
    await prisma.user.create({
        data: admin_user
    })

  return;
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
