"use client";

import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { LucideLoaderCircle, LucideTrash } from "lucide-react";
import { deleteCredential } from "../actions/delete-credential";
import { useRouter } from "next/navigation";

type CredentialDeleteButtonProps = {
  id: string;
  organizationId: string;
};

const CredentialDeleteButton = ({
  id,
  organizationId,
}: CredentialDeleteButtonProps) => {
  const router = useRouter();

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteCredential.bind(null, { id, organizationId }),
    trigger: (isPending) => (
      <Button variant="destructive" size="icon">
        {isPending ? (
          <LucideLoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <LucideTrash className="w-4 h-4" />
        )}
      </Button>
    ),
    onSuccess() {
      router.refresh();
    },
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { CredentialDeleteButton };
