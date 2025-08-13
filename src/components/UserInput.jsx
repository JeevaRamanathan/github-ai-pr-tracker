"use client";

import React, { useState, useEffect, useRef } from "react";
import { useToast } from "@/lib/hooks/use-toast";
import { useData } from "@/lib/hooks/use-data";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PresetShare } from "./shared/preset-share";
import FromDatePicker from "./FromDatePicker";
import ToDatePicker from "./ToDatePicker";

export function UserInput() {
  const {
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
  const shared = searchParams.get("shared");

  const buttonRef = useRef(null);

  useEffect(() => {
    if (username && shared === "true") {
      setUserName(username);
    }
  }, [username, shared]);

  useEffect(() => {
    if (userName && shared === "true" && buttonRef.current) {
      buttonRef.current.click();
    }
  }, [userName, shared]);

  const formatDate = (date) => {
    if (!date) return;
    const localDate = new Date(date);
    localDate.setMinutes(
      localDate.getMinutes() - localDate.getTimezoneOffset()
    );
    return localDate && localDate.toISOString().split("T")[0];
  };

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

            {/* New Date Picker */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <FromDatePicker />
              <ToDatePicker />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button onClick={fetchData} disabled={loadingState == "loading"} ref={buttonRef}>
            {loadingState == "loading" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Check
          </Button>

          {loadingState == "completed" && searchedData.length != 0 && (
            <PresetShare
              url={`${window.location.origin
                }?username=${userName}&from=${formatDate(
                  dateRange?.from
                )}&to=${formatDate(dateRange?.to)}&shared=true`}
            />
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
