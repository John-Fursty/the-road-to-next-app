import { Heading } from "@/components/heading";
import { MembershipsList } from "@/features/membership/components/membership-list";
import { Spinner } from "@/features/ticket/components/spinner";
import { Suspense } from "react";

type MembershipsPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const MembershipsPage = async ({ params }: MembershipsPageProps) => {
  const { organizationId } = await params;

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Memberships"
        description="Manage members in your organization"
      ></Heading>

      <Suspense fallback={<Spinner />}>
        <MembershipsList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default MembershipsPage;
