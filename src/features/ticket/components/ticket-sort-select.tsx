"use client"

import { useQueryStates } from "nuqs";
import { sortParser, sortOptions } from "../search-params";
import { SortSelect, SortSelectionOption } from "@/components/sort-select";


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