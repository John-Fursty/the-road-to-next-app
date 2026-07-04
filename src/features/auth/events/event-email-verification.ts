import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { eventType } from "inngest";
import { z } from "zod";
import { sendEmailVerification } from "../emails/send-email-verification";
import { generateEmailVerificationCode } from "../utils/generate-email-verification-code";

const userPlaced = eventType("app/auth.sign-up", {
  schema: z.object({
    userId: z.string(),
  }),
});

export const emailVerificationEvent = inngest.createFunction(
  { id: "sign-up", triggers: { event: userPlaced } },
  async ({ event }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

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
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { event, body: result };
  },
);
