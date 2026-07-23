"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  credentialsPath,
  invitationPath,
  membershipsPath,
  organizationsPath,
} from "@/paths";
import { useParams, usePathname } from "next/navigation";

const OrganizationBreadcrumbs = () => {
  const params = useParams<{ organizationId: string }>();
  const pathName = usePathname();

  const title = {
    memberships: "Memberships" as const,
    invitations: "Invitations" as const,
    credentials: "Credentials" as const,
  }[
    pathName.split("/").at(-1) as "memberships" | "invitations" | "credentials"
  ];

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
            {
              title: "Credentials",
              href: credentialsPath(params.organizationId),
            },
          ],
        },
      ]}
    />
  );
};

export { OrganizationBreadcrumbs };
