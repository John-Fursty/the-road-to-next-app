"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ defaultValue, name = "deadline" } : { defaultValue?: string, name?:string }) {
  const [date, setDate] = React.useState<Date | undefined>()
  // React.useEffect(() => {
  //   console.log(date)
  // }, [date])

  const formattedData = date ? format(date, "dd.MM.yyyy") : defaultValue

  return (
    <>
    {/* TODO: fix uncontroll element by using https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable */}
      <input type="hidden" name={name} value={formattedData}/>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className="w-full max-w-47.5 justify-start text-left font-normal data-[empty=true]"
          >
            {date ? format(date, "dd.MM.yyyy") : defaultValue ? defaultValue : <span className="text-muted-foreground">dd.mm.yyyy</span>}
            <CalendarIcon className="ml-4"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    </>
  )
}