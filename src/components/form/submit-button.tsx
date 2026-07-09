"use client";

import clsx from "clsx";
import { LucideLoaderCircle } from "lucide-react";
import { cloneElement } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactElement<{ className: string }>;
  variant?:
    "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

export const SubmitButton = ({
  label,
  icon,
  variant,
  size,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  // const { pending } = { pending: true };

  return (
    <Button disabled={pending} type="submit" variant={variant} size={size}>
      {pending ? (
        <LucideLoaderCircle className="h-4 w-4 animate-spin" />
      ) : icon ? (
        <>
          {cloneElement(icon, {
            className: "h-4 w-4",
          })}
        </>
      ) : null}
      {label}
    </Button>
  );
};
