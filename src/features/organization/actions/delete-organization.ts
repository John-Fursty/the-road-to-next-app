"use server";

import {
  fromErrorToAction,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { getOrganizationsByUser } from "../queries/get-organizations-by-user";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";

export const deleteOrganization = async (organizationId: string) => {
  await getAdminOrRedirect(organizationId);

  const organizations = await getOrganizationsByUser();

  const canDelete = organizations.some((organization) => {
    return organization.id === organizationId;
  });

  if (!canDelete) {
    return toActionState("ERROR", "Not a member of this organization");
  }

  try {
    await prisma.organization.delete({
      where: {
        id: organizationId,
      },
    });
  } catch (error) {
    return fromErrorToAction(error);
  }

  return toActionState("SUCCESS", "Organization deleted");
};
