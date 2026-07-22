import { prisma } from "@/lib/prisma";

export const connectReferencedTicket = async (
  ticketId: string,
  ticketIds: string[],
) => {
  await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      referencedTickets: {
        connect: ticketIds.map((id) => ({ id })),
      },
    },
  });
};
