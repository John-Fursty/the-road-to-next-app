"use server";

import { toActionState } from "@/components/form/utils/to-action-state";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { signInPath } from "@/paths";
import { redirect } from "next/navigation";

export const createCheckoutSession = async (
  organizationId: string | null | undefined,
  priceId: string,
) => {
  if (!organizationId) {
    redirect(signInPath());
  }

  await getAdminOrRedirect(organizationId);

  const stripeCustomer = await prisma.stripeCustomer.findUnique({
    where: {
      organizationId,
    },
  });

  if (!stripeCustomer) {
    return toActionState("ERROR", "Stripe customer not found");
  }

  // TODO: session

  //   const session = await stripe.checkout.sessions.create({
  //     customer: stripeCustomer.customerId,
  //     line_items: [
  //       {
  //         price: priceId,
  //         quantity: 1,
  //       },
  //     ],
  //     mode: "subscription",
  //     success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
  //     payment_method_types: ["card"],
  //     // Optional: Add metadata
  //     metadata: {
  //       organizationId: organizationId,
  //     },
  //   });

  if (!session.url) {
    return toActionState("ERROR", "Session URL could not be created");
  }

  redirect(session.url);
};
