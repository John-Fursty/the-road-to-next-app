import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { eventType } from "inngest";
import { z } from "zod";
import { sendEmailInvitation } from "../emails/send-email-invitation";

const userPlaced = eventType("app/invitation.created", {
  schema: z.object({
    userId: z.string(),
    organizationId: z.string(),
    email: z.email(),
    emailInvitationLink: z.string(),
  }),
});

export const invitationCreatedEvent = inngest.createFunction(
  { id: "invitation-created", triggers: { event: "userPlaced" } },
  async ({ event }) => {
    const { userId, organizationId, email, emailInvitationLink } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const organization = await prisma.organization.findUniqueOrThrow({
      where: {
        id: organizationId,
      },
    });

    const result = await sendEmailInvitation(
      user.username,
      organization.name,
      email,
      emailInvitationLink,
    );

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { event, body: result };
  },
);
