import { prisma } from "@/lib/prisma";
import { ParseSearchParams } from "../search-params";

export const getTickets = async (userId: string | undefined, searchParams: ParseSearchParams) => {
    const resolvedSearchParams = await searchParams;
    
    const where = {
        userId,
        title: {
            contains: resolvedSearchParams.search,
            mode: "insensitive" as const,
        },
    }

    const skip = resolvedSearchParams.page * resolvedSearchParams.size;
    const take = resolvedSearchParams.size;
    
    const [tickets, count] = await prisma.$transaction([
        prisma.ticket.findMany({
            where,
            skip,
            take,
            orderBy: {
                [resolvedSearchParams.sortKey]: resolvedSearchParams.sortValue
            },
            include: {
                user: {
                    select: {
                        username: true,
                    }
                },
            }
        }),
        prisma.ticket.count({
            where,
        }),
    ])

    return {
        list: tickets,
        metadata: {
            count,
            hasNextPage: count > skip + take,
        },
    };
 
};