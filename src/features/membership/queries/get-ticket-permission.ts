import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";
import { membershipsPath } from "@/paths";

export const getTicketPermission = async (organizationId?: string) => {
  const { user } = await getAuth();

  if (!user) {
    return null;
  }

  let membership;

  if (organizationId) {
    membership = await prisma.membership.findUnique({
      where: {
        membershipId: {
          userId: user.id,
          organizationId,
        },
      },
    });
  } else {
    membership = await prisma.membership.findFirst({
      where: {
        userId: user.id,
        isActive: true,
      },
    });
  }

  if (!membership) {
    return {
      canDeleteTicket: false,
    };
  }

  return {
    canDeleteTicket: membership.canDeleteTicket,
  };
};
