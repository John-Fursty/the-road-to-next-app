import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CardCompact } from "@/components/card-compact";
import { Separator } from "@/components/ui/separator";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { homePath, ticketPath, ticketsPath } from "@/paths";

type TicketEditPageProps = {
  params: {
    ticketId: string;
  };
};

const ticketEditPage = async ({ params }: TicketEditPageProps) => {
  const resolvedParams = await params;
  const ticket = await getTicket(resolvedParams.ticketId);

  const isTicketFound = !!ticket;

  if (!isTicketFound || !ticket.isOwner) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title, href: ticketPath(ticket.id) },
          { title: "Edit" },
        ]}
      />

      <Separator />

      <div className="flex flex-col justify-center items-center flex-1">
        <CardCompact
          title="Edit ticket"
          description="Edit an current ticket"
          className="w-full max-w-105 fade-in-from-top"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </div>
  );
};

export default ticketEditPage;
