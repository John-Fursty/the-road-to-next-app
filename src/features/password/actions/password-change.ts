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

    const validPassword = await verifyPasswordHash(
      auth.user.passwordHash,
      password,
    );

    if (!validPassword) {
      return toActionState("ERROR", "Incorrect password", formData);
    }

    const passwordResetLink = await generatePasswordResetLink(auth.user.id);

    //TODO: Send email with password reset link
    // instead of logging it to the console
    console.log(passwordResetLink);
  } catch (error) {
    return fromErrorToAction(error, formData);
  }

  return toActionState("SUCCESS", "Check your email for a reset link");
};
