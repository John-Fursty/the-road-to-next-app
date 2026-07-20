"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaperclipIcon } from "lucide-react";
import { SubmitButton } from "@/components/form/submit-button";
import { AttachmentEntity } from "@/generated/prisma/enums";
import { AttachmentCreateForm } from "./attachment-create-form";
import { Button } from "@/components/ui/button";

type AttachmentCreateButtonProps = {
  entityId: string;
  entity: AttachmentEntity;
  onCreateAttachment?: () => void;
};

const AttachmentCreateButton = ({
  entityId,
  entity,
  onCreateAttachment,
}: AttachmentCreateButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    onCreateAttachment?.();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-8 h-8">
          <PaperclipIcon className="w-8 h-8" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File(s)</DialogTitle>
          <DialogDescription>Attach images or PDFs</DialogDescription>
        </DialogHeader>
        <AttachmentCreateForm
          entityId={entityId}
          entity={entity}
          buttons={
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <SubmitButton label="Upload"></SubmitButton>
            </DialogFooter>
          }
          onSuccess={handleSuccess}
        ></AttachmentCreateForm>
      </DialogContent>
    </Dialog>
  );
};

export { AttachmentCreateButton };
