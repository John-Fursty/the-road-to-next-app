"use server";

import { revalidatePath } from "next/cache";
import { fromErrorToAction, toActionState } from "@/components/form/utils/to-action-state";
import { TicketStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";


const updateTicketStatus = async (id: string, status: TicketStatus) => {
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

    await prisma.ticket.update({
        where: {
            id: id,
        },
        data: { status }
    })
    } catch(error) {
        fromErrorToAction(error)
    }

    revalidatePath(ticketsPath())

    return toActionState("SUCCESS", "Status updated")
}

export { updateTicketStatus }