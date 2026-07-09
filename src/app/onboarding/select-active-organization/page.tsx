import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { OrganizationList } from "@/features/organization/components/organization-list";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organizations-by-user";
import { Spinner } from "@/features/ticket/components/spinner";
import { onboardingPath, organizationsPath } from "@/paths";
import { LucidePlus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const SelectActiveOrganizationPage = async () => {
  const organizations = await getOrganizationsByUser();

  const hasActive = organizations.some((organization) => {
    return organization.membershipByUser.isActive;
  });

  if (hasActive) {
    redirect(organizationsPath());
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Select Organization"
        description="Pick one organization to work with"
        actions={
          <Button asChild>
            {/* TODO: fix vertical gap */}
            <Link href={onboardingPath()} className="pt-1">
              <LucidePlus className="w-4 h-4 mb-1" />
              Create Organization
            </Link>
          </Button>
        }
      ></Heading>

      <Suspense fallback={<Spinner />}>
        <OrganizationList limitedAccess />
      </Suspense>
    </div>
  );
};

export default SelectActiveOrganizationPage;
