import { redirect } from "next/navigation";
import { emailVerificationPath, onboardingPath, signInPath } from "@/paths";
import { getAuth } from "./get-auth";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organizations-by-user";

type getAuthOrRedirectProps = {
  checkEmailVerified?: boolean;
  checkOrganization?: boolean;
};

export const getAuthOrRedirect = async (options?: getAuthOrRedirectProps) => {
  const { checkEmailVerified = true, checkOrganization = true } = options ?? {};

  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }

  if (checkEmailVerified && !auth.user.emailVerified) {
    redirect(emailVerificationPath());
  }

  if (checkOrganization) {
    const organizations = await getOrganizationsByUser();

    if (!organizations.length) {
      redirect(onboardingPath());
    }
  }

  return auth;
};
