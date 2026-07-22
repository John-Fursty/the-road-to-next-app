import { s3 } from "@/lib/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { generateS3Key } from "../utils/generate-s3-key";
import { AttachmentSubject } from "../types";
import { AttachmentEntity } from "@/generated/prisma/enums";
import * as attachmentData from "../data";
import * as attachmentSujectDTO from "../dto/attachment-subject-dto";

type createAttachmentsArgs = {
  subject: attachmentSujectDTO.Type;
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

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: generateS3Key({
            organizationId: subject.organizationId,
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
