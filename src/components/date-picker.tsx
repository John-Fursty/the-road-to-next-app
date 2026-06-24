"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import { useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ImperativeHandleFromDatePicker = { reset: () => void } | null;

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
  imperativeHandleRef?: React.RefObject<ImperativeHandleFromDatePicker>;
};

const DatePicker = ({
  id,
  name,
  defaultValue,
  imperativeHandleRef,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );

  const [open, setOpen] = useState(false);

  const handlerSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);
  };

  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => setDate(new Date()),
  }));

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <>
      {/* TODO: fix uncontroll element by using https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable */}
      <input type="hidden" name={name} value={formattedStringDate} />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full" id={id} asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className="justify-between text-left font-normal"
          >
            {formattedStringDate}
            <LucideCalendar className="" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={handlerSelect} />
        </PopoverContent>
      </Popover>
    </>
  );
};

export { DatePicker };
