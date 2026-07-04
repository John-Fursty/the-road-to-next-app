"use client";

import { useActionState } from "react";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/form-error";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { emailVerification } from "../actions/email-verifications";

const EmailVerificationForm = () => {
  const [actionState, action] = useActionState(
    emailVerification,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="code"
        placeholder="code"
        defaultValue={actionState.payload?.get("code") as string}
      />
      <FieldError actionState={actionState} name="code" />

      <SubmitButton label="Verify email" />
    </Form>
  );
};

export { EmailVerificationForm };
