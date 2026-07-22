import { AttachmentEntity } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import * as attachmentSujectDTO from "../dto/attachment-subject-dto";

export const getAttachmentSubject = async (
  entityId: string,
  entity: AttachmentEntity,
) => {
  switch (entity) {
    case "TICKET": {
      const ticket = await prisma.ticket.findUnique({
        where: {
          id: entityId,
        },
      });

      return attachmentSujectDTO.fromTicket(ticket);
    }
    case "COMMENT": {
      const comment = await prisma.comment.findUnique({
        where: {
          id: entityId,
        },
        include: {
          ticket: true,
        },
      });

      return attachmentSujectDTO.fromComment(comment);
    }
    default:
      return null;
  }
};
