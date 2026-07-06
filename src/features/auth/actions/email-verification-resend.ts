"use server";

import {
  fromErrorToAction,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";
import { sendEmailVerification } from "../emails/send-email-verification";
import { generateEmailVerificationCode } from "../utils/generate-email-verification-code";

export const emailVerificationResend = async () => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
  });

  try {
    const verificationCode = await generateEmailVerificationCode(
      user.id,
      user.email,
    );

    const result = await sendEmailVerification(
      user.username,
      user.email,
      verificationCode,
    );

    console.log(verificationCode); // TODO: remove after validated email will be integrited

    if (result.error) {
      return toActionState("ERROR", "Failed to send verification email");
    }
  } catch (error) {
    return fromErrorToAction(error);
  }

  return toActionState("SUCCESS", "Verification email has been sent");
};
