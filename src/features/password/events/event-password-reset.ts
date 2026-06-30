import { inngest } from "@/lib/inngest";
import { generatePasswordResetLink } from "../utils/generate-password-reset";
import { prisma } from "@/lib/prisma";
import { sendEmailPasswordReset } from "../emails/send-email-password-reset";
import { eventType } from "inngest";
import { z } from "zod";

const userPlaced = eventType("app/password.password-reset", {
  schema: z.object({
    userId: z.string(),
  }),
});

export const passwordResetEvent = inngest.createFunction(
  { id: "password-reset", triggers: { event: userPlaced } },
  async ({ event }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const passwordResetLink = await generatePasswordResetLink(user.id);

    const result = await sendEmailPasswordReset(
      user.username,
      user.email,
      passwordResetLink,
    );
    console.log(passwordResetLink); // TODO: remove after validated email will be integrited

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { event, body: result };
  },
);
