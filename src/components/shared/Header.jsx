import { ThemeToggle } from "@/components/theme/themeToggle";
import { ThemeColorToggle } from "../theme/themeColorToggle";
import Image from "next/image";
import AppLogo from "../../app-logo.svg";
import { EventsInfo } from "./EventsInfo";
import { appConfig } from "@/config/appConfig";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function Header() {
  return (
    <header className="flex items-center justify-between sticky top-0 z-30 h-14 w-full border-b bg-background-95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2">
      <div className="ml-2 flex items-center mr-4">
        <Image priority src={AppLogo} alt="Logo" />
        <h1 className="text-indigo-950 dark:text-slate-300 cursor-pointer text-xl ml-2  text-xl font-bold  leading-snug tracking-tighter ">
          {appConfig.appname}
        </h1>
      </div>
      <div className="flex items-center gap-2 ">
        <a
          href={appConfig.github.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="icon">
            <GitHubLogoIcon />
          </Button>
        </a>
        <EventsInfo />
        <ThemeToggle />
        <ThemeColorToggle />
      </div>
    </header>
  );
}
