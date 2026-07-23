"use server";

import {
  ActionState,
  fromErrorToAction,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { credentialsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import z from "zod";
import { generateCredentialLink } from "../utils/generate-credential";

const createCredentialSchema = z.object({
  name: z.string().min(1, { message: "IS required" }).max(191),
});

export const createCredential = async (
  organizationId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  await getAdminOrRedirect(organizationId);

  let secret;

  try {
    const { name } = createCredentialSchema.parse({
      name: formData.get("name"),
    });

    secret = await generateCredentialLink(organizationId, name);

    // await inngest.send({
    //   name: "app/Credential.created",
    //   data: {
    //     userId: user.id,
    //     organizationId,
    //     name,
    //     nameCredentialLink,
    //   },
    // });
  } catch (error) {
    return fromErrorToAction(error);
  }

  revalidatePath(credentialsPath(organizationId));

  return toActionState(
    "SUCCESS",
    `Copy the sercet, we will not show it again: ${secret}`,
  );
};
