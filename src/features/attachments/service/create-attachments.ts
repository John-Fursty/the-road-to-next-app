import { s3 } from "@/lib/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getOrganizationByAttachment } from "../utils/attachment-helper";
import { generateS3Key } from "../utils/generate-s3-key";
import { AttachmentSubject } from "../types";
import { AttachmentEntity } from "@/generated/prisma/enums";
import * as attachmentData from "../data";

type createAttachmentsArgs = {
  subject: AttachmentSubject;
  entity: AttachmentEntity;
  entityId: string;
  files: File[];
};

export const createAttachments = async ({
  subject,
  entity,
  entityId,
  files,
}: createAttachmentsArgs) => {
  const attachments = [];

  try {
    for (const file of files) {
      const buffer = await Buffer.from(await file.arrayBuffer());

      const attachment = await attachmentData.createAttachment({
        name: file.name,
        entity,
        entityId,
      });

      attachments.push(attachment);

      let organizationId = getOrganizationByAttachment(entity, subject);

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: generateS3Key({
            organizationId,
            entityId,
            entity,
            fileName: file.name,
            attachmentId: attachment.id,
          }),
          Body: buffer,
          ContentType: file.type,
        }),
      );
    }
  } catch (error) {
    throw error;
  }

  return attachments;
};
function attachmentDatacreateAttachment(arg0: {
  name: string;
  entity: AttachmentEntity;
  entityId: string;
}) {
  throw new Error("Function not implemented.");
}
