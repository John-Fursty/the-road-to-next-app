"use server";

import z from "zod";
import {
  ActionState,
  fromErrorToAction,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { generatePasswordResetLink } from "../utils/generate-password-reset";

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

    //TODO: Send email with password reset link
    // instead of logging it to the console
    console.log(passwordResetLink);
  } catch (error) {
    return fromErrorToAction(error, formData);
  }

  return toActionState("SUCCESS", "Check your email for a reset link");
};
