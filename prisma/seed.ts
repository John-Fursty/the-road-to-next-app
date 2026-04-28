import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });


const tickets = [
    {
        title: "Ticket 1",
        content: "This is the first ticket from the DB",
        status: "DONE" as const
    },
    {
        title: "Ticket 2",
        content: "This is the second ticket from the DB",
        status: "OPEN" as const
    },
    {
        title: "Ticket 3",
        content: "This is the third ticket from the DB",
        status: "IN_PROGRESS" as const
    }
]

const seed = async () => {
    const t0 = performance.now()
    console.log("DB SEED: Started ...")

    await prisma.ticket.deleteMany()

    await prisma.ticket.createMany({data:tickets,})

    const t1 = performance.now()
    console.log(`DB SEED: Finished (${t1 - t0}ms)`)
}

seed()