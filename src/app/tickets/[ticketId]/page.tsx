import { notFound } from "next/navigation";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

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
        
        <TicketItem ticket={ticket} isDetail/>
    );
}

export default TicketsPage