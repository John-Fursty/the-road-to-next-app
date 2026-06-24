"use client";

import { LucideTrash } from "lucide-react";
import { Fragment, useActionState } from "react";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Form } from "@/components/form/form";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import { deleteComment } from "../actions/delete-comments";
import { CommentWithMetadata } from "../types";

type ComponentDeleteFormProps = {
  commentId: string;
};

const CommentDeleteButton = ({ commentId }: ComponentDeleteFormProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, commentId),
    trigger: (
      <Button variant="outline" size="icon">
        <LucideTrash className="w-4 h-4"></LucideTrash>
      </Button>
    ),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { CommentDeleteButton };
