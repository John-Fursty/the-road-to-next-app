import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { eventType } from "inngest";
import { z } from "zod";

const userPlaced = eventType("app/organization.created", {
  schema: z.object({
    organizationId: z.string(),
    byEmail: z.string(),
  }),
});

export const organizationCreatedEvent = inngest.createFunction(
  { id: "organization-created", triggers: { event: userPlaced } },
  async ({ event }) => {
    const { organizationId, byEmail } = event.data;

    const organization = await prisma.organization.findUniqueOrThrow({
      where: {
        id: organizationId,
      },
      include: {
        memberships: {
          include: {
            user: true,
          },
        },
      },
    });

    const stripeCustomer = await stripe.customers.create({
      name: organization.name,
      email: byEmail,
      metadata: {
        organizationId: organization.id,
      },
    });

    await prisma.stripeCustomer.create({
      data: {
        organizationId,
        customerId: stripeCustomer.id,
      },
    });

    return { event, body: true };
  },
);
