import { initialTickets } from "@/data";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

const TicketsPage = async ({ params }: TicketPageProps ) => {
    const { ticketId } = await params;
    
    const ticket = initialTickets.find((ticket) => ticket.id === ticketId)

    if (!ticket) {
        return (
            <div>
                <h2>Ticket not found!</h2>
            </div>
        )
    }
 
    return (
        
        <div>
            <h2 className="text-lg">{ticket.title}</h2>
            <p className="text-sm">{ticket.content}</p>
        </div>
    );
}

export default TicketsPage