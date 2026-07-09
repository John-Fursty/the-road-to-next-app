"use server";

import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToAction,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { redirect } from "next/navigation";
import z from "zod";

const createOrganizationSchema = z.object({
  name: z.string().min(1).max(191),
});

export const createOrganization = async (
  _actionate: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect({
    checkOrganization: false,
    checkActiveOrganization: false,
  });

  try {
    const data = createOrganizationSchema.parse({
      name: formData.get("name"),
    });

    await prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          ...data,
          memberships: {
            create: {
              userId: user.id,
              isActive: true,
            },
          },
        },
      });

      await tx.membership.updateMany({
        where: {
          userId: user.id,
          organizationId: {
            not: organization.id,
          },
        },
        data: {
          isActive: false,
        },
      });
    });
  } catch (error) {
    return fromErrorToAction(error);
  }

  await setCookieByKey("toast", "Organization created");
  redirect(ticketsPath());
};
