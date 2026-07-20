import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "../types";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

type CommentItemProps = {
  comment: CommentWithMetadata;
  sections: {
    label: string;
    content: React.ReactNode;
  }[];
  buttons: React.ReactNode[];
};

const CommentItem = ({ comment, sections, buttons }: CommentItemProps) => {
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

        {sections.map((section) => (
          <div key={section.label} className="space-y-2 mt-2">
            <Separator />

            <h4 className="text-sm text-muted-foreground">{section.label}</h4>

            <div>{section.content}</div>
          </div>
        ))}
      </Card>

      <div className="flex flex-col gap-y-2">{buttons}</div>
    </div>
  );
};

export { CommentItem };
