"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import {
  ActionState,
  fromErrorToAction,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { generateRandomToken } from "@/utils/crypto";
import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";
import { setCookieByKey } from "@/actions/cookies";
import { validateEmailVerificationCode } from "../utils/validate-email-verification-code";

const emailVerificationSchema = z.object({
  code: z.string().length(8),
});

export const emailVerification = async (
  _actionate: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect({ checkEmailVerified: false });

  try {
    const { code } = emailVerificationSchema.parse(
      Object.fromEntries(formData),
    );

    const validCode = await validateEmailVerificationCode(
      user.id,
      user.email,
      code,
    );

    if (!validCode) {
      return toActionState("ERROR", "Invalid or expired code");
    }

    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    });

    const sessionToken = generateRandomToken();
    // const session = await lucia.createSession(sessionToken, user.id);
    const sessionCookie = lucia.createSessionCookie(sessionToken);

    const cookieStore = await cookies();

    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    return fromErrorToAction(error, formData);
  }

  await setCookieByKey("toast", "Email verified");
  redirect(ticketsPath());
};
