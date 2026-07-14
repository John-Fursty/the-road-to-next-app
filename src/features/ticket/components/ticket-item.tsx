import clsx from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TICKET_ICONS } from "@/features/constants";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import { TicketMoreMenu } from "./ticket-more-menu";
import { TicketWithMetadata } from "../types";

type TicketItemProps = {
  ticket: TicketWithMetadata;
  isDetail?: boolean;
  attachments?: React.ReactNode;
  comments?: React.ReactNode;
};

const TicketItem = ({
  ticket,
  isDetail,
  attachments,
  comments,
}: TicketItemProps) => {
  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketPath(ticket.id)} className="text-sm underline">
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  const editButton = ticket.isOwner ? (
    <form>
      <Button variant="outline" size="icon">
        <Link prefetch href={ticketEditPath(ticket.id)}>
          <LucidePencil className="h-4 w-4"></LucidePencil>
        </Link>
      </Button>
    </form>
  ) : null;

  const moreMenu = ticket.isOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ) : null;
  return (
    <div
      className={clsx("w-full flex flex-col max-w-105 gap-y-4", {
        "max-w-145": isDetail,
        "max-w-105": !isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex gap-x-2">
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span className="truncate">{ticket.title}</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-y-4">
            <span
              className={clsx("whitespace-break-spaces", {
                "line-clamp-3": !isDetail,
              })}
            >
              {ticket.content}
            </span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              {editButton} {moreMenu}
            </>
          ) : (
            <>
              {detailButton} {editButton}
            </>
          )}
        </div>
      </div>
      {attachments}
      {comments}
    </div>
  );
};

export { TicketItem };
