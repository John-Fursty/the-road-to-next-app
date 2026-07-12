"use client";

import { LucideTrash } from "lucide-react";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TICKET_STATUS_LABELS } from "@/features/constants";
import { TicketStatus } from "@/generated/prisma/client";
import { deleteTicket } from "../actions/delete-ticket";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { TicketWithMetadata } from "../types";

type TicketMoreMenuProps = {
  ticket: TicketWithMetadata;
  trigger: React.ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem disabled={!ticket.permission.canDeleteTicket}>
        <LucideTrash className="h-4 w-4" />
        <span className="mt-1">Delete</span>
      </DropdownMenuItem>
    ),
  });

  const handleUpdateTicketStatus = async (value: string) => {
    const promise = updateTicketStatus(ticket.id, value as TicketStatus);

    toast.promise(promise, {
      loading: "Updating status...",
    });

    const result = await promise;

    if (result.status === "SUCCESS") {
      toast.error(result.message);
    } else if (result.status === "ERROR") {
      toast.success(result.message);
    }
  };

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {TICKET_STATUS_LABELS[key]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" side="right">
          {ticketStatusRadioGroupItems}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { TicketMoreMenu };
