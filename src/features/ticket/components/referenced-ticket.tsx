import { CardCompact } from "@/components/card-compact";
import { ticketPath } from "@/paths";
import { LucideArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getReferencedTickets } from "../queries/get-referenced-tickets";

type ReferencedTicketsProps = {
  ticketId: string;
};

const ReferencedTickets = async ({ ticketId }: ReferencedTicketsProps) => {
  const referencedTickets = await getReferencedTickets(ticketId);

  if (!referencedTickets.length) return null;

  return (
    <CardCompact
      title="Referenced Tickets"
      description="Tickets that have been referenced in comments"
      content={
        <div className="mx-2 mb-4">
          {referencedTickets.map((referencedTickets) => (
            <div key={referencedTickets.id}>
              <Link
                className="flex gap-x-2 items-center text-sm"
                href={ticketPath(referencedTickets.id)}
              >
                <LucideArrowUpRight className="h-4 w-4" />
                {referencedTickets.title}
              </Link>
            </div>
          ))}
        </div>
      }
    ></CardCompact>
  );
};

export { ReferencedTickets };
