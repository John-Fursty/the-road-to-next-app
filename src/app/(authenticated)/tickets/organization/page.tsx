import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { getAuth } from "@/features/auth/queries/get-auth";
import { Spinner } from "@/features/ticket/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { searchParamsCache } from "@/features/ticket/search-params";

export const dynamic = "force-dynamic";

type TicketByOrganizationPageProps = {
  searchParams: Promise<SearchParams>;
};

const TicketByOrganizationPage = async ({
  searchParams,
}: TicketByOrganizationPageProps) => {
  const { user } = await getAuth();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Our Tickets"
        description="All tickets related to our organization"
      />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        className="self-center w-full max-w-105"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList
          byOrganization
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </div>
  );
};

export default TicketByOrganizationPage;
