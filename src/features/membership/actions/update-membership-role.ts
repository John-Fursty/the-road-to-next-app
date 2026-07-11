"use server";

import { MembershipRole } from "@/generated/prisma/enums";
import { getAdminOrRedirect } from "../queries/get-admin-or-redirect";
import { toActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { membershipsPath } from "@/paths";
import { getMemberships } from "../queries/get-memberships";

export const updateMembershipRole = async ({
  userId,
  organizationId,
  membershipRole,
}: {
  userId: string;
  organizationId: string;
  membershipRole: MembershipRole;
}) => {
  await getAdminOrRedirect(organizationId);

  const memberships = await getMemberships(organizationId);

  // Check is membership exists

  const targetMembership = (memberships ?? []).find(
    (membership) => membership.userId === userId,
  );

  if (!targetMembership) {
    return toActionState("ERROR", "Membership not found");
  }

  // Check if last admin

  const adminMemberships = (memberships ?? []).filter(
    (membership) => membership.membershipRole === "ADMIN",
  );

  const removesAdmin = targetMembership.membershipRole === "ADMIN";
  const isLastAdmin = adminMemberships.length <= 1;

  if (removesAdmin && isLastAdmin) {
    return toActionState(
      "ERROR",
      "You cannot remove the last of an organization",
    );
  }

  // Okay: Everything checked ...

  await prisma.membership.update({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
    data: {
      membershipRole,
    },
  });

  revalidatePath(membershipsPath(organizationId));

  return toActionState("SUCCESS", "The role has been updated");
};
