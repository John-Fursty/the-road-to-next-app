import { s3 } from "@/lib/aws";
import { inngest } from "@/lib/inngest";
import { eventType } from "inngest";
import { z } from "zod";
import { generateS3Key } from "../utils/generate-s3-key";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { AttachmentEntity } from "@/generated/prisma/enums";

const userPlaced = eventType("app/attachment.deleted", {
  schema: z.object({
    organizationId: z.string(),
    entityId: z.string(),
    entity: z.enum(AttachmentEntity),
    fileName: z.string(),
    attachmentId: z.string(),
  }),
});

export const attachmentDeletedEvent = inngest.createFunction(
  { id: "attachment-deleted", triggers: { event: userPlaced } },
  async ({ event }) => {
    const { organizationId, entity, entityId, fileName, attachmentId } =
      event.data;

    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: generateS3Key({
            organizationId,
            entityId,
            entity,
            fileName,
            attachmentId,
          }),
        }),
      );
    } catch (error) {
      console.log(error);
      return { event, body: false };
    }

    return { event, body: true };
  },
);
