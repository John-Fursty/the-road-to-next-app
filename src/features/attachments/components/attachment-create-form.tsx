"use client";

import { Form } from "@/components/form/form";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionState } from "react";
import { ACCEPTED } from "../constants";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/form/form-error";
import { SubmitButton } from "@/components/form/submit-button";
import { createAttachments } from "../actions/create-attachments";

type AttachmentCreateFormProps = {
  ticketId: string;
};

const AttachmentCreateForm = ({ ticketId }: AttachmentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createAttachments.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        type="file"
        name="files"
        id="files"
        multiple
        accept={ACCEPTED.join(",")}
      ></Input>
      <FieldError actionState={actionState} name="files" />

      <SubmitButton label="Upload"></SubmitButton>
    </Form>
  );
};

export { AttachmentCreateForm };
