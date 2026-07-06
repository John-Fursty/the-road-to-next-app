"use client";

import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/form-error";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { createOrganization } from "../actions/create-organization";

const OrganizationCreateForm = () => {
  const [actionState, action] = useActionState(
    createOrganization,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="name"
        placeholder="Name"
        defaultValue={actionState.payload?.get("name") as string}
      ></Input>

      <FieldError name="name" actionState={actionState} />

      <SubmitButton label="Create" />
    </Form>
  );
};

export { OrganizationCreateForm };
