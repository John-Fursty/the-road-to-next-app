"use server";

import { toActionState } from "@/components/form/utils/to-action-state";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { prisma } from "@/lib/prisma";

type deleteCredentialProps = {
  organizationId: string;
  id: string;
};

export const deleteCredential = async ({
  organizationId,
  id,
}: deleteCredentialProps) => {
  await getAdminOrRedirect(organizationId);

  const credential = await prisma.credential.findUnique({
    where: {
      id,
    },
  });

  if (!credential) {
    return toActionState("ERROR", "Credential not found");
  }

  await prisma.credential.delete({
    where: {
      id,
    },
  });

  return toActionState("SUCCESS", "Credential deleted");
};
