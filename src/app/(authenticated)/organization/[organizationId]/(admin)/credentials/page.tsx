import { Heading } from "@/components/heading";
import { OrganizationBreadcrumbs } from "../_navigation/tabs";
import { CredentialCreateButton } from "@/features/credential/components/credential-create-button";
import { CredentialList } from "@/features/credential/components/credential-list";
import { Spinner } from "@/features/ticket/components/spinner";
import { Suspense } from "react";

type CredentiaslPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const CredentiaslPage = async ({ params }: CredentiaslPageProps) => {
  const { organizationId } = await params;

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Credentials"
        description="Manage your organization's API secrets"
        tabs={<OrganizationBreadcrumbs />}
        actions={<CredentialCreateButton organizationId={organizationId} />}
      ></Heading>

      <Suspense fallback={<Spinner />}>
        <CredentialList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default CredentiaslPage;
