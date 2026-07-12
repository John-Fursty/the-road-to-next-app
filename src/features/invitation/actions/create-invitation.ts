"use server";

import {
  ActionState,
  fromErrorToAction,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { prisma } from "@/lib/prisma";
import { invitationPath } from "@/paths";
import { revalidatePath } from "next/cache";
import z from "zod";
import { generateInvitationLink } from "../utils/generate-invitation";
import { inngest } from "@/lib/inngest";

const createInvitationSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export const createInvitation = async (
  organizationId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAdminOrRedirect(organizationId);

  try {
    const { email } = createInvitationSchema.parse({
      email: formData.get("email"),
    });

    const targetMembership = await prisma.membership.findFirst({
      where: {
        organizationId,
        user: {
          email,
        },
      },
    });

    if (targetMembership) {
      return toActionState(
        "ERROR",
        "User is already a member of this organization",
      );
    }

    // TODO: invite by email link to join organization

    const emailInvitationLink = await generateInvitationLink(
      user.id,
      organizationId,
      email,
    );

    await inngest.send({
      name: "app/invitation.created",
      data: {
        userId: user.id,
        organizationId,
        email,
        emailInvitationLink,
      },
    });

    console.log(emailInvitationLink);
  } catch (error) {
    return fromErrorToAction(error);
  }

  revalidatePath(invitationPath(organizationId));

  return toActionState("SUCCESS", "User invited to organization");
};
