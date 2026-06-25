"use client";

import { LucideLoaderCircle, LucideTrash } from "lucide-react";
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
    trigger: (isPending) => (
      <Button variant="outline" size="icon">
        {isPending ? (
          <>
            <LucideLoaderCircle className="w-4 h-4 animate-spin"></LucideLoaderCircle>
          </>
        ) : (
          <LucideTrash className="w-4 h-4"></LucideTrash>
        )}
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
