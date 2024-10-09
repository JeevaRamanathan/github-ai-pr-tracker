"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/lib/hooks/use-toast";
import { useData } from "@/lib/hooks/use-data";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { events } from "@/lib/constants/events";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PresetShare } from "./shared/preset-share";

export function UserInput() {
  const {
    selectedEvent,
    setSelectedEvent,
    dateRange,
    setDateRange,
    userName,
    setUserName,
    fetchPRDetails,
    loadingState,
    searchedData,
  } = useData();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const event = searchParams.get("event");
  const shared = searchParams.get("shared");

  useEffect(() => {
    if (username && from && to && event && shared == "true") {
      if (username) setUserName(username);

      if (from) {
        const startDate = new Date(from);
        console.log(startDate);

        if (!isNaN(startDate)) {
          setDateRange((prev) => ({ ...prev, from: startDate }));
        } else {
          console.error("Invalid date format for 'from':", from);
        }
      }
      if (to) {
        const endDate = new Date(to);
        if (!isNaN(endDate)) {
          setDateRange((prev) => ({ ...prev, to: endDate }));
        } else {
          console.error("Invalid date format for 'to':", to);
        }
      }
      if (event) setSelectedEvent(event);
      fetchPRDetails();
    }
  }, [username, from, to, event, shared]);

  useEffect(() => {
    if (!event) {
      setSelectedEvent("hacktoberfest");
    }
  }, []);

  const eventDate = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();

    if (selectedEvent === "hacktoberfest") {
      return month === 9;
    } else if (selectedEvent === "devfest" || selectedEvent == "taipy") {
      return month === 9 && year === 2024;
    }
    return true;
  };

  const formatDate = (date) => {
    if (!date) return;
    const localDate = new Date(date);
    localDate.setMinutes(
      localDate.getMinutes() - localDate.getTimezoneOffset()
    );
    return localDate && localDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (selectedEvent === "hacktoberfest" && shared != "true") {
      setDateRange({ from: new Date(2024, 9, 1), to: new Date(2024, 9, 31) });
    } else if (
      selectedEvent === "devfest" ||
      (selectedEvent === "taipy" && shared != "true")
    ) {
      setDateRange({ from: new Date(2024, 9, 1), to: new Date(2024, 9, 31) });
    } else if (selectedEvent == "none" && shared != "true") {
      setDateRange({ from: new Date(), to: new Date() });
    }
  }, [selectedEvent, setDateRange]);

  const fetchData = () => {
    if (!userName || !dateRange?.from || !dateRange?.to) {
      toast({
        variant: "destructive",
        title: "Uh oh! Please provide the github username",
      });
    } else {
      fetchPRDetails();
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <Card className="w-[900px]  sm:w-[900px] p-3 sm:p-5">
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="username"
                placeholder="GitHub Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Select
                value={selectedEvent}
                onValueChange={(value) => setSelectedEvent(value)}
              >
                <SelectTrigger id="event">
                  <SelectValue placeholder="Select Event" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {events.map((data) => {
                    return (
                      <SelectItem key={data.value} value={data.value}>
                        {data.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <div className={cn("grid gap-2")}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      disabled={(date) => !eventDate(date)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={fetchData} disabled={loadingState == "loading"}>
            {loadingState == "loading" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Check
          </Button>

          {loadingState == "completed" && searchedData.length != 0 && (
            <PresetShare
              url={`${
                window.location.origin
              }?username=${userName}&event=${selectedEvent}&from=${formatDate(
                dateRange?.from
              )}&to=${formatDate(dateRange?.to)}&shared=true`}
            />
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
