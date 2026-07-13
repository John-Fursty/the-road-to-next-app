"use server";

import { setCookieByKey } from "@/actions/cookies";
import {
  fromErrorToAction,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { signInPath, signUpPath } from "@/paths";
import { hashToken } from "@/utils/crypto";
import { redirect } from "next/navigation";

export const acceptInvitation = async (tokenId: string) => {
  try {
    const tokenHash = hashToken(tokenId);

    const invitation = await prisma.invitation.findUnique({
      where: {
        tokenHash,
      },
    });

    if (!invitation) {
      return toActionState("ERROR", "Revoked or invalid verification token");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: invitation.email,
      },
    });

    if (user) {
      console.log("yes user");
      await prisma.$transaction([
        prisma.invitation.delete({
          where: {
            tokenHash,
          },
        }),
        prisma.membership.create({
          data: {
            organizationId: invitation.organizationId,
            userId: user.id,
            membershipRole: "MEMBER",
            isActive: false,
          },
        }),
      ]);
    } else {
      console.log("no user");
      await prisma.invitation.update({
        where: {
          tokenHash,
        },
        data: {
          status: "ACCEPTED_WITHOUT_ACCOUNT",
        },
      });
    }
  } catch (error) {
    return fromErrorToAction(error);
  }

  await setCookieByKey("toast", "Invitation accepted");
  redirect(signInPath());
};
