import { getTickets } from "@/features/ticket/queries/get-tickets";
import { TicketItem } from "./ticket-item";
import { SearchInput } from "@/components/search-input";
import { SearchParams } from "../search-params";
import { Placeholder } from "@/components/placeholder";
import { SortSelect } from "@/components/sort-select";

type TicketListProps = {
    userId?: string;
    searchParams: SearchParams;
}

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
    const tickets = await getTickets(userId, searchParams);

    return (
        <div className="flex-1 flex flex-col items-center gap-y-4 fade-in-from-top">
           <div className="w-full max-w-105 grid grid-cols-2 gap-x-2">
                <SearchInput placeholder="Search tickets..." />
                <SortSelect
                  defaultValue="newest"
                  options={[
                    { label: "Newest", value: "newest"},
                    { label: "Bounty", value: "bounty"}
                ]} />
           </div>
           
            {tickets.length ? ( tickets.map((ticket) => (
                <TicketItem key={ticket.id} ticket={ticket}/>
            ))) : <Placeholder label="No tickets found"/>}
        </div>
    );
};

export {TicketList}
