import { prisma } from "@/lib/prisma";

export const getReferencedTickets = async (id: string) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      referencedTickets: true,
    },
  });

  return ticket?.referencedTickets ?? [];
};
