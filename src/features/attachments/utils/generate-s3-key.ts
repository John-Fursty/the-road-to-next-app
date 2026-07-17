import { AttachmentEntity } from "@/generated/prisma/client";

type generateS3KeyProps = {
  organizationId: string;
  entityId: string;
  entity: AttachmentEntity;
  fileName: string;
  attachmentId: string;
};

export const generateS3Key = ({
  organizationId,
  entityId,
  entity,
  fileName,
  attachmentId,
}: generateS3KeyProps) => {
  return `${organizationId}/${entity}/${entityId}/${fileName}-${attachmentId}`;
};
