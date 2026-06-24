import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "../types";
import { format } from "date-fns";

type CommentItemProps = {
  comment: CommentWithMetadata;
  buttons: React.ReactNode[];
};

const CommentItem = ({ comment, buttons }: CommentItemProps) => {
  return (
    <div className="flex gap-x-2">
      <Card className="p-4 flex-1 flex flex-col gap-y-1 w-135 w ful">
        <div className="flex justify-between">
          <p className="text-muted-foreground text-sm">
            {comment.user?.username ?? "Deleted user"}
          </p>
          <p className="text-muted-foreground text-sm">
            {format(comment.createdAt, "yyyy-MM-dd, HH:mm")}
          </p>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>
      <div className="flex flex-col gap-y-2">{buttons}</div>
    </div>
  );
};

export { CommentItem };
