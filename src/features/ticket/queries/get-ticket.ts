import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getTicketPermission } from "@/features/membership/queries/get-ticket-permission";
import { prisma } from "@/lib/prisma";

export const getTicket = async (id: string) => {
  const { user } = await getAuth();

  const ticket = await prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  const activeMembership = await getTicketPermission(ticket?.organizationId);

  if (!ticket) return null;

  return {
    ...ticket,
    isOwner: isOwner(user, ticket),
    permission: {
      canDeleteTicket:
        isOwner(user, ticket) && !!activeMembership?.canDeleteTicket,
    },
  };
};
