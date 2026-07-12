"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import {
  fromErrorToAction,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { getTicketPermission } from "@/features/membership/queries/get-ticket-permission";

export const deleteTicket = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState("ERROR", "Not authorized");
    }

    const permission = await getTicketPermission(ticket.organizationId);

    if (!permission?.canDeleteTicket) {
      return toActionState("ERROR", "Not authorized");
    }

    await prisma.ticket.delete({
      where: { id },
    });
  } catch (error) {
    return fromErrorToAction(error);
  }

  revalidatePath(ticketsPath());
  await setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath());
};
