import { notFound } from "next/navigation";
import { CardCompact } from "@/components/card-compact"
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketEditPageProps = {
    params: {
        ticketId: string;
    };
}

const ticketEditPage = async ({ params }: TicketEditPageProps) => {
    const resolvedParams = await ( params);
    const ticket = await getTicket(resolvedParams.ticketId)

    if (!ticket) {
        notFound();
    }

    return (
        <div className="flex flex-col justify-center items-center flex-1">
         <CardCompact title="Edit ticket" description="Edit an current ticket" className="w-full max-w-105 fade-in-from-top" content={<TicketUpsertForm ticket={ticket}/>} />
        </div>
    )
}

export default ticketEditPage;