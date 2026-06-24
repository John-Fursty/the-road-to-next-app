"use client";

import { LucideTrash } from "lucide-react";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { deleteComment } from "../actions/delete-comments";

type ComponentDeleteFormProps = {
  commentId: string;
  onDeleteComment?: (id: string) => void;
};

const CommentDeleteButton = ({
  commentId,
  onDeleteComment,
}: ComponentDeleteFormProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, commentId),
    trigger: (
      <Button variant="outline" size="icon">
        <LucideTrash className="w-4 h-4"></LucideTrash>
      </Button>
    ),
    onSuccess: () => onDeleteComment?.(commentId),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { CommentDeleteButton };
