"use client";

import { Form } from "@/components/form/form";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionState } from "react";
import { ACCEPTED } from "../constants";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/form/form-error";
import { SubmitButton } from "@/components/form/submit-button";
import { createAttachments } from "../actions/create-attachments";
import { AttachmentEntity } from "@/generated/prisma/enums";

type AttachmentCreateFormProps = {
  entityId: string;
  entity: AttachmentEntity;
  buttons?: React.ReactNode;
  onSuccess?: () => void;
};

const AttachmentCreateForm = ({
  entityId,
  entity,
  buttons,
  onSuccess,
}: AttachmentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createAttachments.bind(null, { entityId, entity }),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState} onSuccess={onSuccess}>
      <Input
        type="file"
        name="files"
        id="files"
        multiple
        accept={ACCEPTED.join(",")}
      ></Input>
      <FieldError actionState={actionState} name="files" />

      {buttons || <SubmitButton label="Upload" />}
    </Form>
  );
};

export { AttachmentCreateForm };
