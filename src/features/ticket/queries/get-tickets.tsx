import { prisma } from "@/lib/prisma";
import { ParseSearchParams } from "../search-params";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getActiveOrganization } from "@/features/organization/queries/get-active-organization";

export const getTickets = async (
  userId: string | undefined,
  byOrganization: boolean,
  searchParams: ParseSearchParams,
) => {
  const resolvedSearchParams = await searchParams;

  const { user } = await getAuth();
  const activeOrganization = await getActiveOrganization();

  const where = {
    userId,
    title: {
      contains: resolvedSearchParams.search,
      mode: "insensitive" as const,
    },
    ...(byOrganization && activeOrganization
      ? {
          organizationId: activeOrganization.id,
        }
      : {}),
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
