import { AttachmentEntity } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { Attachment } from "resend";

type CreateAttachmentArgs = {
  name: string;
  entity: AttachmentEntity;
  entityId: string;
};

export const createAttachment = async ({
  name,
  entity,
  entityId,
}: CreateAttachmentArgs) => {
  return await prisma.attachment.create({
    data: {
      name,
      ...(entity === "TICKET" ? { ticketId: entityId } : {}),
      ...(entity === "COMMENT" ? { commentId: entityId } : {}),
      entity,
    },
  });
};
