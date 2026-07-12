import { Heading } from "@/components/heading";
import { MembershipsList } from "@/features/membership/components/membership-list";
import { Spinner } from "@/features/ticket/components/spinner";
import { Suspense } from "react";
import { OrganizationBreadcrumbs } from "../_navigation/tabs";
import { InvitationList } from "@/features/invitation/components/invitation-list";
import { InvitationCreateButton } from "@/features/invitation/components/invitation-create-button";

type InvitationsPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const InvitationsPage = async ({ params }: InvitationsPageProps) => {
  const { organizationId } = await params;

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Invitations"
        description="Manage members in organization's invitations"
        tabs={<OrganizationBreadcrumbs />}
        actions={<InvitationCreateButton organizationId={organizationId} />}
      ></Heading>

      <Suspense fallback={<Spinner />}>
        <InvitationList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default InvitationsPage;
