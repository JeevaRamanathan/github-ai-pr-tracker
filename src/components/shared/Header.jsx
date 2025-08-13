import { ThemeToggle } from "@/components/theme/themeToggle";
import { ThemeColorToggle } from "../theme/themeColorToggle";
import Image from "next/image";
import AppLogo from "../../app-logo.svg";
import { appConfig } from "@/config/appConfig";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function Header() {
  return (
    <header className="flex items-center justify-between sticky top-0 z-30 h-20 w-full border-b bg-background-95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
      <div className="ml-2 flex items-center mr-4">
        <Image priority src={AppLogo} alt="Logo" />

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-indigo-950 dark:text-slate-300 cursor-pointer ml-2  text-xl font-bold  leading-snug tracking-tighter ">
            {appConfig.appname}
          </h1>

          <span className="text-[10px] font-semibold text-gray-500 -ml-1">Powered by Groq</span>
        </div>
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
        <ThemeToggle />
        <ThemeColorToggle />
      </div>
    </header>
  );
}
