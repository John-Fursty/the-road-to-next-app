"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { fromErrorToAction } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const deleteTicket = async (id: string) => {
    try {
        await prisma.ticket.delete({
            where: {id},
        })
    } catch (error) {
        return fromErrorToAction(error)
    }

    revalidatePath(ticketsPath())
    await setCookieByKey("toast", "Ticket deleted");
    redirect(ticketsPath())

}