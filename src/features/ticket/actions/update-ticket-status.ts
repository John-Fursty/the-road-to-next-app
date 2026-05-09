"use server";

import { revalidatePath } from "next/cache";
import { fromErrorToAction, toActionState } from "@/components/form/utils/to-action-state";
import { TicketStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";


const updateTicketStatus = async (id: string, status: TicketStatus) => {
    try {
        await prisma.ticket.update({
            where: {
                id: id
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