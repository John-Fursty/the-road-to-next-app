"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { Pagination } from "@/components/pagination";
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "../search-params";
import { PaginatedData } from "@/types/paginations";
import { TicketWithMetadata } from "../types";

type TicketPaginationProps = {
  //   paginationTicketMetadata: {
  //     count: number;
  //     hasNextPage: boolean;
  //   };
  paginationTicketMetadata: PaginatedData<TicketWithMetadata>["metadata"];
};

const TicketPagination = ({
  paginationTicketMetadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  const [search] = useQueryState("search", searchParser);
  const prefSearch = useRef(search);

  useEffect(() => {
    if (search === prefSearch.current) return;
    prefSearch.current = search;

    setPagination({ ...pagination, page: 0 });
  }, [pagination, search, setPagination]);

  // add more reactive events here once needed ...

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginationMetadata={paginationTicketMetadata}
    />
  );
};

export { TicketPagination };
