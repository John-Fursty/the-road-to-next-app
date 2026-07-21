"use client";

import { useInView } from "react-intersection-observer";
import { CardCompact } from "@/components/card-compact";
import { CommentWithMetadata } from "../../types";
import { CommentCreateForm } from ".././comment-create-form";
import { CommentDeleteButton } from ".././comment-delete-button";
import { CommentItem } from ".././comment-item";
import { PaginatedData } from "@/types/paginations";
import { useEffect } from "react";
import { usePaginatedComment } from "./use-paginated-comment";
import { Skeleton } from "@/components/ui/skeleton";
import { CommentList } from "../comments-list";

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const {
    comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    onCreateComment,
    onDeleteComment,
    onDeleteAttachment,
  } = usePaginatedComment(ticketId, paginatedComments);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={onCreateComment}
          />
        }
      />

      <div className="flex flex-col gap-y-2 ml-8">
        <CommentList
          comments={comments}
          onDeleteComment={onDeleteComment}
          onDeleteAttachment={onDeleteAttachment}
        />

        {isFetchingNextPage && (
          <>
            <div className="flex gap-x-2">
              <Skeleton className="h-20.5 w-full"></Skeleton>
              <Skeleton className="h-10 w-10"></Skeleton>
            </div>
            <div className="flex gap-x-2">
              <Skeleton className="h-20.5 w-full"></Skeleton>
              <Skeleton className="h-10 w-10"></Skeleton>
            </div>
          </>
        )}
      </div>

      <div ref={ref}>
        {!hasNextPage && (
          <p className="text-right text-xs italic">No more comments</p>
        )}
      </div>
    </>
  );
};

export { Comments };
