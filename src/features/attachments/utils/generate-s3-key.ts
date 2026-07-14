type generateS3KeyProps = {
  organizationId: string;
  ticketId: string;
  fileName: string;
  attachmentId: string;
};

export const generateS3Key = ({
  organizationId,
  ticketId,
  fileName,
  attachmentId,
}: generateS3KeyProps) => {
  return `${organizationId}/${ticketId}/${fileName}-${attachmentId}`;
};
