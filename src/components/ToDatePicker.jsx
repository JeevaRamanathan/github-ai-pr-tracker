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

export default function ToDatePicker() {
  const { dateRange, setDateRange } = useData();

  const [open, setOpen] = React.useState(false);

  const searchParams = useSearchParams();
  const to = searchParams.get("to");

  React.useEffect(() => {
    if (to) {
      const endDate = new Date(to);

      if (!isNaN(endDate)) {
        setDateRange((prev) => ({ ...prev, to: endDate.toLocaleDateString("en-CA") }));
      } else {
        console.error("Invalid date format for 'from':", from);
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {dateRange.to ? dateRange.to : "End date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            captionLayout="dropdown"
            selected={dateRange.to}
            onSelect={(currDate) => {
              const ToDate = currDate.toLocaleDateString("en-CA");
              setDateRange((prev) => ({
                ...prev,
                to: ToDate,
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
