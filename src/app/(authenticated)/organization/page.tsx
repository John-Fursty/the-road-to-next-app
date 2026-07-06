import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { OrganizationList } from "@/features/organization/components/organization-list";
import { Spinner } from "@/features/ticket/components/spinner";
import { organizationCreatePath } from "@/paths";
import { LucidePlus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const OrganizationPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Organization"
        description="All your organizations"
        actions={
          <Button asChild>
            {/* TODO: fix vertical gap */}
            <Link href={organizationCreatePath()} className="pt-1">
              <LucidePlus className="w-4 h-4 mb-1" />
              Create Organization
            </Link>
          </Button>
        }
      ></Heading>

      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
};

export default OrganizationPage;
