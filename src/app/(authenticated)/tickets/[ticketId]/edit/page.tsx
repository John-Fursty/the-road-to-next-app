import { notFound } from "next/navigation";
import { CardCompact } from "@/components/card-compact"
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getAuth } from "@/features/auth/queries/get-auth";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { homePath, ticketPath, ticketsPath } from "@/paths";
import { Separator } from "@/components/ui/separator";

type TicketEditPageProps = {
    params: {
        ticketId: string;
    };
}

const ticketEditPage = async ({ params }: TicketEditPageProps) => {
    const { user } = await getAuth();
    
    const resolvedParams = await ( params);
    const ticket = await getTicket(resolvedParams.ticketId)

    const isTicketFound = !!ticket
    const isTicketOwner = isOwner(user, ticket);

    if (!isTicketFound || !isTicketOwner) {
        notFound();
    }

    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Breadcrumbs breadcrumbs={[
                { title: "Tickets", href: homePath() },
                { title: ticket.title, href: ticketPath(ticket.id) },
                { title: "Edit"}
            ]} />

            <Separator />

            <div className="flex flex-col justify-center items-center flex-1">
            <CardCompact title="Edit ticket" description="Edit an current ticket" className="w-full max-w-105 fade-in-from-top" content={<TicketUpsertForm ticket={ticket}/>} />
            </div>
        </div>
    )
}

export default ticketEditPage;