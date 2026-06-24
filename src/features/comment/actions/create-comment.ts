"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import {
  ActionState,
  fromErrorToAction,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export const createComment = async (
  ticketId: string,
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const { user } = await getAuthOrRedirect();

  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData));

    await prisma.comment.create({
      data: {
        ...data,
        userId: user.id,
        ticketId,
      },
    });
  } catch (error) {
    return fromErrorToAction(error);
  }

  revalidatePath(ticketPath(ticketId));
  return toActionState("SUCCESS", "Comment created");
};
