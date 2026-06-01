import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { hash } from "@node-rs/argon2";
const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const users = [
    {
        username: "admin",
        email: "admin@admin.com"
    },
    {
        username: "user",
        email: "volynetsyan@gmail.com",
    }
]

const tickets = [
    {
        title: "Ticket 1",
        content: "This is the first ticket from the DB",
        status: "DONE" as const,
        deadline: "2026-05-07",
        bounty: 20,
    },
    {
        title: "Ticket 2",
        content: "This is the second ticket from the DB",
        status: "OPEN" as const,
        deadline: "2026-05-07",
        bounty: 20,
    },
    {
        title: "Ticket 3",
        content: "This is the third ticket from the DB",
        status: "IN_PROGRESS" as const,
        deadline: "2026-05-07",
        bounty: 20,
    }
]

const seed = async () => {
    const t0 = performance.now()
    console.log("DB SEED: Started ...")

    await prisma.ticket.deleteMany();
    await prisma.user.deleteMany();


    const passwordHash = await hash("geheimnis");
    
    const dbUsers = await prisma.user.createManyAndReturn({
        data: users.map((user) => ({
            ...user,
            passwordHash,
        }))
    });

    await prisma.ticket.createMany({
        data: tickets.map((ticket) => ({
            ...ticket, 
            userId: dbUsers[0].id
        }))
    })

    const t1 = performance.now()
    console.log(`DB SEED: Finished (${t1 - t0}ms)`)
}

seed()