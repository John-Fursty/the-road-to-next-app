import { s3 } from "@/lib/aws";
import { inngest } from "@/lib/inngest";
import { eventType } from "inngest";
import { z } from "zod";
import { generateS3Key } from "../utils/generate-s3-key";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

const userPlaced = eventType("app/attachment.deleted", {
  schema: z.object({
    attachmentId: z.string(),
    organizationId: z.string(),
    ticketId: z.string(),
    fileName: z.string(),
  }),
});

export const attachmentDeletedEvent = inngest.createFunction(
  { id: "attachment-deleted", triggers: { event: userPlaced } },
  async ({ event }) => {
    const { organizationId, ticketId, fileName, attachmentId } = event.data;

    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: generateS3Key({
            organizationId,
            ticketId,
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
