"use server";

import {
  fromErrorToAction,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { getOrganizationsByUser } from "../queries/get-organizations-by-user";

export const deleteOrganization = async (organizationId: string) => {
  await getAuthOrRedirect();

  const organizations = await getOrganizationsByUser();

  const canDelete = organizations.some(
    (organization) => organization.id === organizationId,
  );

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
