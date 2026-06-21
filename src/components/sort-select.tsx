"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Option = {
    label: string;
    value: string;
}

type SortSelectProps = {
    defaultValue: string;
    options: Option[];
}

const SortSelect = ({ defaultValue, options }: SortSelectProps) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSort = 
        (value: string) => {
            const params = new URLSearchParams(searchParams)

        if (value === defaultValue) {
            params.delete("sort");
        } else if (value) {
            params.set("sort", value);
        } else {
            params.delete("sort");
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false })
        
    }

    return (
        <Select onValueChange={handleSort} defaultValue={searchParams.get("sort")?.toString() || defaultValue}>
            <SelectTrigger className="w-full">
                <SelectValue  />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    // MODIFICATION: Padding right for better look
                    <SelectItem className="pl-3" key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export { SortSelect };