import { notFound } from "next/navigation";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { RedirectToast } from "@/features/ticket/components/redirect-toast";

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
        <>
            <div className="flex justify-center fade-in-from-top">
                <TicketItem ticket={ticket} isDetail/>
            </div>
        <RedirectToast />
        </>
    );
}

// export async function generateStaticParams() {
//     const tickets = await getTickets()

//     return tickets.map((ticket) => ({
//         ticketId: ticket.id,
//     }))
// }

export default TicketsPage