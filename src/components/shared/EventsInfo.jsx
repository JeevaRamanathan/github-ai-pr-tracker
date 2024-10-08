import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircleQuestion, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EventsInfo = () => {
  return (
    <div className="flex space-x-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <MessageCircleQuestion className="h-[1.2rem] w-[1.2rem] transition-all dark:text-white" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Here are the events and their details</DialogTitle>
            <DialogDescription className="space-y-4">
              <div>
                <h3 className="text-lg font-bold underline text-dark">
                  Hacktoberfest
                </h3>
                <p className="text-gray-700 dark:text-slate-400">
                  PRs/MRs must be created between October 1 and October 31. Your
                  PRs/MRs need to be either merged, labeled with
                  "hacktoberfest-accepted", or be within a repository that has
                  the "hacktoberfest" topic. More details on  <a
                    href="https://hacktoberfest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    hacktoberfest.com
                  </a>.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold underline">DevFest</h3>
                <p className="text-gray-700 dark:text-slate-400">
                  PRs/MRs must be created between October 1 and October 31 of 2024, and
                  should be in repositories that are whitelisted by DevFest (
                  <a
                    href="https://devfest.ai/repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    devfest.ai/repositories
                  </a>
                  ).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold underline">Taipy - Hacktoberfest</h3>
                <p className="text-gray-700 dark:text-slate-400">
                  PRs/MRs must be created between October 1 and October 31 of 2024.
                  Contributions should be made to the{" "}
                  <a
                    href="https://github.com/Avaiga/taipy/issues?q=is%3Aissue+is%3Aopen+label%3Ahacktoberfest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    <code>avaiga/taipy</code>
                  </a>{" "}
                  repository, with the "hacktoberfest" label on your PRs/MRs.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
