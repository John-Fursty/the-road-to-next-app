import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getComments } from "../../queries/get-comments";
import { CommentWithMetadata } from "../../types";
import { PaginatedData } from "@/types/paginations";

export const usePaginatedComment = (
  ticketId: string,
  paginatedComments: PaginatedData<CommentWithMetadata>,
) => {
  const queryKey = ["comments", ticketId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const queryCient = useQueryClient();

  return {
    comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    onCreateComment: () => queryCient.invalidateQueries({ queryKey }),
    onDeleteComment: () => queryCient.invalidateQueries({ queryKey }),
  };
};
