import { prisma } from "@/lib/prisma";
import { ParseSearchParams } from "../search-params";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParseSearchParams,
) => {
  const resolvedSearchParams = await searchParams;

  const { user } = await getAuth();

  const where = {
    userId,
    title: {
      contains: resolvedSearchParams.search,
      mode: "insensitive" as const,
    },
  };

  const skip = resolvedSearchParams.page * resolvedSearchParams.size;
  const take = resolvedSearchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
      orderBy: {
        [resolvedSearchParams.sortKey]: resolvedSearchParams.sortValue,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(user, ticket),
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
