"use server";

import z from "zod";
import {
  ActionState,
  fromErrorToAction,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { generatePasswordResetLink } from "../utils/generate-password-reset";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { verifyPasswordHash } from "../utils/hash-and-verify";
import { sendEmailPasswordReset } from "../emails/send-email-password-reset";
import { prisma } from "@/lib/prisma";
import { inngest } from "@/lib/inngest";

const passwordChangeScheme = z.object({
  password: z.string().min(6).max(191),
});

export const passwordChange = async (
  _actionate: ActionState,
  formData: FormData,
) => {
  const auth = await getAuthOrRedirect();

  try {
    const { password } = passwordChangeScheme.parse({
      password: formData.get("password"),
    });

    const user = await prisma.user.findUnique({
      where: { username: auth.user.username },
    });

    if (!user) {
      // we should never reach this return statement
      // but it's just in case
      return toActionState("ERROR", "Incorrect email", formData);
    }

    const validPassword = await verifyPasswordHash(
      auth.user.passwordHash,
      password,
    );

    if (!validPassword) {
      return toActionState("ERROR", "Incorrect password", formData);
    }

    const passwordResetLink = await generatePasswordResetLink(auth.user.id);

    await inngest.send({
      name: "app/password.password-reset",
      data: { userId: user.id },
    });

    console.log(passwordResetLink);
  } catch (error) {
    return fromErrorToAction(error, formData);
  }

  return toActionState("SUCCESS", "Check your email for a reset link");
};
