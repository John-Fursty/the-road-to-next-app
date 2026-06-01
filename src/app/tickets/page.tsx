import { Suspense } from "react";
import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/features/ticket/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { signInPath } from "@/paths";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

const TicketsPage = async () => {

  redirect(signInPath());

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