"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";
import { themeColors } from "./themes.jsx";

export function ThemeColorToggle() {
  const { theme } = useTheme();
  const [themeColor, setThemeColor] = useState(themeColors[0].name);

  useEffect(() => {
    const body = window.document.body;
    body.classList.forEach((className) => {
      if (className.startsWith("theme-")) {
        body.classList.remove(className);
      }
    });
    body.classList.add(`theme-${themeColor}`)
  }, [themeColor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Paintbrush className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="space-y-1.5">
          <Label className="text-xs">Select Color</Label>
          <div className="grid grid-cols-3 gap-2">
            {themeColors.map((th) => {
              const isActive = themeColor === th.name;
              return (
                <Button
                  variant={"outline"}
                  size="sm"
                  key={th.name}
                  onClick={() => setThemeColor(th.name)}
                  className={cn(
                    "justify-start",
                    isActive && "border-2 border-primary"
                  )}
                  style={{
                    "--theme-primary": `hsl(${
                      th?.activeColor[theme === "dark" ? "dark" : "light"]
                    })`,
                  }}
                >
                  <span
                    className={cn(
                      "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]"
                    )}
                  >
                    {isActive && <CheckIcon className="h-4 w-4 text-white" />}
                  </span>
                  {th.label}
                </Button>
              );
            })}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
