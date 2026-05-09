"use client"

import clsx from "clsx";
import { LucideMoreVertical, LucidePencil, LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter,CardHeader, CardTitle } from "@/components/ui/card";
import { TICKET_ICONS } from "@/features/constants";
import { Ticket } from "@/generated/prisma/client";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import { TicketMoreMenu } from "./ticket-more-menu";

type TicketItemProps = {
    ticket: Ticket,
    isDetail?: boolean,
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
    const detailButton = (
        <Button variant="outline" size="icon" asChild>
            <Link prefetch href={ticketPath(ticket.id)} className="text-sm underline"><LucideSquareArrowOutUpRight /></Link>
        </Button> 
    )

const editButton = (
    <form>
        <Button variant="outline" size="icon">
           <Link prefetch href={ticketEditPath(ticket.id)}>
                <LucidePencil className="h-4 w-4"></LucidePencil>
            </Link>
        </Button>
    </form>
)


const moreMenu = <TicketMoreMenu ticket={ticket} trigger={<Button variant="outline" size="icon">
                    <LucideMoreVertical className="h-4 w-4"/>
                </Button>} />
    
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

            <CardContent className="flex flex-col gap-y-4">
                <span className={clsx("whitespace-break-spaces", {
                    "line-clamp-3": !isDetail,
                })}>{ticket.content}</span>
            </CardContent>
            <CardFooter className="flex justify-between">
                    <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
                    <p className="text-sm text-muted-foreground">{toCurrencyFromCent(ticket.bounty)}</p>
            </CardFooter>
        </Card>

    <div className="flex flex-col gap-y-1">
        {isDetail ? <>{editButton} {moreMenu}</> : <>{detailButton} {editButton}</>}
    </div>      
    
    </div>
);
};

export { TicketItem }