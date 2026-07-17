import { AttachmentEntity } from "@/generated/prisma/enums";
import { AttachmentSubject, isComment, isTicket } from "../types";
import { ticketPath } from "@/paths";
import { revalidatePath } from "next/cache";

export const getOrganizationByAttachment = (
  entity: AttachmentEntity,
  subject: null | AttachmentSubject,
) => {
  if (!subject) return "";

  let organizationId = "";
  switch (entity) {
    case "TICKET":
      if (isTicket(subject)) {
        revalidatePath(ticketPath(subject.id));
      }
      break;
    case "COMMENT": {
      if (isComment(subject)) {
        revalidatePath(ticketPath(subject.ticket.id));
      }
      break;
    }
  }

  return organizationId;
};
