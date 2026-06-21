import { prisma } from "@/lib/prisma";
import { SearchParams } from "../search-params";

export const getTickets = async (userId: string | undefined, searchParams: SearchParams) => {
    const resolvedSearchParams = await searchParams;
    return await prisma.ticket.findMany({
        where: {
            userId,
            ...(typeof resolvedSearchParams.search === "string" && {
            title: {
                contains: resolvedSearchParams.search,
                mode: "insensitive",
            },
          }),
        },
        orderBy: {
            // createdAt: "desc",
            ...(resolvedSearchParams.sort === undefined && { createdAt: "desc"}),
            ...(resolvedSearchParams.sort === "bounty" && { bounty: "desc"}),
        },
        include: {
            user: {
                select: {
                    username: true,
                }
            },
        }
    })

    
};