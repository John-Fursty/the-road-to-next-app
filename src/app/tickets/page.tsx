import { Suspense } from "react";
import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/features/ticket/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getBaseUrl } from "@/utils/url";

const TicketsPage = () => {
  console.log(getBaseUrl())

  return ( 
      <div className="flex-1 flex flex-col gap-y-8">
        <Heading title="Tickets" description="All your tickets at one place"/>

        <CardCompact 
          title="Create Ticket"
          description="A new ticket will be created"
          className="self-center w-full max-w-105"
          content={<TicketUpsertForm />}
          />

        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </div>
   
  );
}

export default TicketsPage