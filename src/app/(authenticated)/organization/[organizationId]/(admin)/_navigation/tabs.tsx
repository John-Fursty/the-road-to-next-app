"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { invitationPath, membershipsPath, organizationsPath } from "@/paths";
import { useParams, usePathname } from "next/navigation";

const OrganizationBreadcrumbs = () => {
  const params = useParams<{ organizationId: string }>();
  const pathName = usePathname();

  const title = {
    memberships: "Memberships" as const,
    invitations: "Invitations" as const,
  }[pathName.split("/").at(-1) as "memberships" | "invitations"];

  return (
    <Breadcrumbs
      breadcrumbs={[
        { title: "Organization", href: organizationsPath() },
        {
          title,
          dropdown: [
            {
              title: "Memberships",
              href: membershipsPath(params.organizationId),
            },
            {
              title: "Invitation",
              href: invitationPath(params.organizationId),
            },
          ],
        },
      ]}
    />
  );
};

export { OrganizationBreadcrumbs };
