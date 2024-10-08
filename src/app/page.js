"use client";

import "@/components/theme/theme.css";
import { Header } from "@/components/shared/Header";
import { UserInput } from "@/components/UserInput";
import { ResultTable } from "@/components/ResultTable";
import { DataProvider } from "@/lib/hooks/use-data";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import "@/lib/styles/styles.css";

export default function Home() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <ApolloProvider client={client}>
        <DataProvider>
          <div className="bg-primary-foreground/40 dark:bg-primary/5">
            <Header />
            <div className="text-center italic mt-3 text-sky-700 font-bold">
              Track Your GitHub Pull Requests for Various Open Source Events
              with AI Assistance
            </div>
            <div className="container">
              <UserInput />
              <ResultTable />
            </div>
          </div>

          <CopilotPopup
            instructions={
              "Help the user to fetch the details/status of github pull requests for various events like hacktoberfest, devfest or in general. Prompt for username if its not provided."
            }
            defaultOpen={false}
            labels={{
              title: "AI Powered Github Pull Request Tracker",
              initial: [
                "Hello there! 👋 I can assist you in retrieving the details of GitHub pull requests for events like Hacktoberfest, Devfest, or general submissions.",
                "Please note: I'm currently using a free version of the Groq model, so responses may sometimes be slower or less accurate, and too many frequent requests at same time may result in rate limit exceeded errors with empty responses. Please try after sometime in such cases. But I'm continually improving!",
              ],
            }}
            clickOutsideToClose={false}
          />
        </DataProvider>
      </ApolloProvider>
    </CopilotKit>
  );
}
