"use client"

import { useQueryStates } from "nuqs";
import { SortSelect, SortSelectionOption } from "@/components/sort-select";
import { sortOptions,sortParser } from "../search-params";


type TicketSortSelectProps = {
    options: SortSelectionOption[];
}

const TicketSortSelect = ({options}: TicketSortSelectProps) => {
    const [sort, setSort] = useQueryStates(sortParser, sortOptions);

    return (
        <SortSelect options={options} onChange={setSort} value={sort}/>
    )
};

export { TicketSortSelect };