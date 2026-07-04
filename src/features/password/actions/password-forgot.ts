"use server";

import z from "zod";
import {
  ActionState,
  fromErrorToAction,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { generatePasswordResetLink } from "../utils/generate-password-reset";
import { sendEmailPasswordReset } from "../emails/send-email-password-reset";
import { inngest } from "@/lib/inngest";

const passwordForgotScheme = z.object({
  email: z.email(),
});

export const passwordForgot = async (
  _actionate: ActionState,
  formData: FormData,
) => {
  try {
    const { email } = passwordForgotScheme.parse(Object.fromEntries(formData));

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return toActionState("ERROR", "Incorrect email", formData);
    }

    const passwordResetLink = await generatePasswordResetLink(user.id);

    console.log(passwordResetLink); //TODO: replace with email

    await inngest.send({
      name: "app/password.password-reset",
      data: { userId: user.id },
    });

    // return NextResponse.json({ message: "Event sent" });
  } catch (error) {
    return fromErrorToAction(error, formData);
  }

  return toActionState("SUCCESS", "Check your email for a reset link");
};
