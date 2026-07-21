"use client";

import { useActionState } from "react";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/form-error";
import { SubmitButton } from "@/components/form/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions/create-comment";
import { CommentWithMetadata } from "../types";
import { Input } from "@/components/ui/input";
import { ACCEPTED } from "@/features/attachments/constants";

type CommentCreateFormProps = {
  ticketId: string;
  onCreateComment?: (comment: CommentWithMetadata | undefined) => void;
};

const CommentCreateForm = ({
  ticketId,
  onCreateComment,
}: CommentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );

  const handleSuccess = (
    actionState: ActionState<CommentWithMetadata | undefined>,
  ) => {
    onCreateComment?.(actionState.data);
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea name="content" placeholder="What's on your mind"></Textarea>
      <FieldError name="content" actionState={actionState} />

      <Input
        name="files"
        id="files"
        type="file"
        multiple
        accept={ACCEPTED.join(",")}
      />
      <FieldError actionState={actionState} name="files"></FieldError>

      <SubmitButton label="Comment" />
    </Form>
  );
};

export { CommentCreateForm };
