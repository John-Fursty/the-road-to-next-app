import { redirect } from "next/navigation";
import { emailVerificationPath, signInPath } from "@/paths";
import { getAuth } from "./get-auth";

type getAuthOrRedirectProps = {
  checkEmailVerified: boolean;
};

export const getAuthOrRedirect = async (options?: getAuthOrRedirectProps) => {
  const { checkEmailVerified = true } = options ?? {};

  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }

  if (checkEmailVerified && !auth.user.emailVerified) {
    redirect(emailVerificationPath());
  }

  return auth;
};
