"use client"

import clsx from "clsx";
import { LucideSquareArrowOutUpRight, LucideTrash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter,CardHeader, CardTitle } from "@/components/ui/card";
import { TICKET_ICONS } from "@/features/constants";
import { Ticket } from "@/generated/prisma/client";
import { ticketPath } from "@/paths";
import { deleteTicket } from "../actions/delete-ticket";

type TicketItemProps = {
    ticket: Ticket,
    isDetail?: boolean,
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
    const detailButton = (
        <Button variant="outline" size="icon" asChild>
            <Link href={ticketPath(ticket.id)} className="text-sm underline"><LucideSquareArrowOutUpRight /></Link>
        </Button> 
    )

const deleteButton = (
    <form action={deleteTicket.bind(null, ticket.id)}>
        <Button variant="outline" size="icon">
            <LucideTrash className="h-4 w-4"/>
        </Button>
    </form>
)
    
return (
    <div className={clsx("w-full max-w-105 flex gap-x-1", {
        "max-w-145": isDetail,
        "max-w-105": !isDetail,
    })}>
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex gap-x-2">
                <span>{TICKET_ICONS[ticket.status]}</span>
                <span className="truncate">{ticket.title}</span>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <span className={clsx("whitespace-break-spaces", {
                    "line-clamp-3": !isDetail,
                })}>{ticket.content}</span>
            </CardContent>
        </Card>

    <div className="flex flex-col gap-y-1">
        {isDetail ? deleteButton : detailButton}
    </div>      
    
    </div>
);
};

export { TicketItem }