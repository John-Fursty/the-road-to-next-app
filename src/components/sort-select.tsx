"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type SortSelectionOption = {
  label: string;
  sortValue: string;
  sortKey: string;
};

type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  options: SortSelectionOption[];
  onChange: (sort: SortObject) => void;
  value: SortObject;
};

const SortSelect = ({ options, onChange, value }: SortSelectProps) => {
  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");

    onChange({ sortKey, sortValue });
  };

  return (
    <Select
      onValueChange={handleSort}
      defaultValue={value.sortKey + "_" + value.sortValue}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          // MODIFICATION: Padding right for better look
          <SelectItem
            className="pl-3"
            key={option.sortKey + option.sortValue}
            value={option.sortKey + "_" + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
