import { prisma } from "@/lib/prisma";
import { emailInvitationPath, passwordResetPath } from "@/paths";
import { generateRandomToken, hashToken } from "@/utils/crypto";
import { getBaseUrl } from "@/utils/url";

// const PASSWORD_RESET_TOKEN_LIFETIME_MS = 1000 * 60 * 60 * 2;

export const generateInvitationLink = async (
  invitedByUserId: string,
  organizationId: string,
  email: string,
) => {
  await prisma.invitation.deleteMany({
    where: {
      email,
      organizationId,
    },
  });

  const tokenId = generateRandomToken();
  const tokenHash = hashToken(tokenId);

  await prisma.invitation.create({
    data: {
      tokenHash,
      invitedByUserId,
      organizationId,
      email,
      // expiresAt: new Date(Date.now() + PASSWORD_RESET_TOKEN_LIFETIME_MS), // TODO: add if will be needed
    },
  });

  const pageUrl = getBaseUrl() + emailInvitationPath();
  const emailInvitationLink = pageUrl + `/${tokenId}`;

  return emailInvitationLink;
};
