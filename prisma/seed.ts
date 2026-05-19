
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient()

async function main() {
    const passwordHash = await bcrypt.hash("ohnanawhat", 10)

    await prisma.admin.upsert({
        where: {email: "d.baasanbayar@gmail.com"},
        update: {},
        create: {
            email: "d.baasanbayar@gmail.com",
            passwordHash,
        }
    })
    console.log("admin created")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
