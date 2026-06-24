import z, { ZodError } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

export const fromErrorToAction = (
  error: unknown,
  formData?: FormData,
): ActionState => {
  if (error instanceof ZodError) {
    const flattened = z.flattenError(error);

    return {
      status: "ERROR",
      message: "",
      fieldErrors: flattened.fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  } else {
    return {
      status: "ERROR",
      message: "An unknown error occured",
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }
};

export const toActionState = (
  status: ActionState["status"],
  message: string,
  formData?: FormData,
): ActionState => {
  return {
    status,
    message: message,
    fieldErrors: {},
    payload: formData,
    timestamp: Date.now(),
  };
};
