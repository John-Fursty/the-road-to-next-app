import { notFound } from "next/navigation";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { homePath } from "@/paths";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

const TicketsPage = async ({ params }: TicketPageProps ) => {
    const { ticketId } = await params;
    
    const ticket = await getTicket(ticketId)

    if (!ticket) {
        notFound();
        
    }
 
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Breadcrumbs breadcrumbs={[
                { title: "Tickets", href: homePath() },
                { title: ticket.title },
            ]} />

            <Separator />

            <div className="flex justify-center fade-in-from-top">
                <TicketItem ticket={ticket} isDetail/>
            </div>
        </div>
    );
}

export default TicketsPage