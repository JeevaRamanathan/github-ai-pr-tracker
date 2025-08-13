"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useData } from "@/lib/hooks/use-data";
import { useSearchParams } from "next/navigation";

export default function FromDatePicker() {
  const { dateRange, setDateRange } = useData();

  const [open, setOpen] = React.useState(false);

  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  React.useEffect(() => {
    if (from) {
      const startDate = new Date(from);

      if (!isNaN(startDate)) {
        setDateRange((prev) => ({ ...prev, from: startDate.toLocaleDateString("en-CA") }));
      } else {
        console.error("Invalid date format for 'from':", from);
      }
    }
  }, [from, setDateRange]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {dateRange.from ? dateRange.from : "Start date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            captionLayout="dropdown"
            selected={dateRange.from}
            onSelect={(currDate) => {
              const FromDate = currDate.toLocaleDateString("en-CA");
              setDateRange((prev) => ({
                ...prev,
                from: FromDate,
              }));
              setOpen(false);
            }}
            disabled={(currentDate) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return currentDate > today;
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
