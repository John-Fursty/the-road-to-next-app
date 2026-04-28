import clsx from "clsx";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ticketPath } from "@/paths";
import Link from "next/link";
import { TICKET_ICONS } from "@/features/constants";
import { Ticket } from "../types";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

        {isDetail ? null : (<div className="flex flex-col gap-y-1"> {detailButton}</div>)}
                            
        </div>
    );
};

export { TicketItem }