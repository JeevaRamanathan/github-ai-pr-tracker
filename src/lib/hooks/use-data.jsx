"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { useFetchPRDetails } from "../useFetchPRDetails.js";
import {
  getHacktoberfestData,
  getDevfestData,
  getDevFestRepos,
  getTaipyData,
} from "@/lib/utils";

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [dateRange, setDateRange] = useState({
    from: new Date("2024-10-01"),
    to: new Date("2024-10-31"),
  });
  const [userName, setUserName] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  // const [allData, setAllData] = useState([]);
  const [loadingState, setLoadingState] = useState("idle");
  const [error, setError] = useState(null);
  const [searchedData, setSearchedData] = useState([]);
  const [devFestRepos, setDevFestRepos] = useState([]);

  const { allData } = useFetchPRDetails(
    userName,
    dateRange,
    setLoadingState,
    setError,
    shouldFetch,
    setShouldFetch
  );

  useEffect(() => {
    var eventData = [];
    if (loadingState == "completed") {
      if (selectedEvent == "hacktoberfest") {
        eventData = getHacktoberfestData(allData);
      } else if (selectedEvent == "devfest") {
        eventData = getDevfestData(allData, devFestRepos);
      } else if (selectedEvent == "taipy") {
        eventData = getTaipyData(allData);
      } else {
        eventData = allData;
      }
    }
    setSearchedData(eventData);
  }, [allData, devFestRepos]);

  const supportedEvents = {
    hacktoberfest: {
      description:
        "Month-long event in October focused on promoting open source contributions. Repositories must have the 'hacktoberfest' label or PRs/MRs should have the 'hacktoberfest-accepted' label. More info at hacktoberfest.com.",
    },
    devfest: {
      description:
        "This is an event where contributed are made to AI based repositories which are whitelisted by devfest under 'https://devfest.ai/repositories' in 2024.",
    },
    taipy: {
      description:
        "This context looks for pull requests (PRs) with the 'hacktoberfest' tag and within the 'github.com/avaiga/taipy' repository in 2024.",
    },
  };

  useCopilotReadable({
    description: "This is the state of Pull Requests",
    value: searchedData,
  });

  useCopilotReadable({
    description: "Supported events and their descriptions",
    value: supportedEvents,
  });

  const fetchPRDetails = () => {
    setShouldFetch(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repos = await getDevFestRepos();
        console.log("Devfest", repos);
        setDevFestRepos(repos.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useCopilotAction({
    name: "setUsername",
    description: "Sets the username of the github user.",
    parameters: [
      {
        name: "username",
        type: "string",
        description: "Github username to search for",
        required: true,
      },
    ],
    handler: ({ username }) => {
      setUserName(username);
    },
  });
  useCopilotAction({
    name: "setDate",
    description:
      "Sets the date range and fetch the data if username is present",
    parameters: [
      {
        name: "from",
        type: "date",
        description: "Start date of the range (mmm d,yyyy)",
        required: true,
      },
      {
        name: "to",
        type: "date",
        description: "End date of the range (mmm d,yyyy)",
        required: true,
      },
    ],
    handler: ({ from, to }) => {
      setDateRange({ from, to });
    },
  });
  useCopilotAction({
    name: "setEvent",
    description:
      "Set the selected event to hacktoberfest, devfest, taipy event or none based on user's input",
    parameters: [
      {
        name: "event",
        type: "string",
        description:
          "Event name to switch to (hacktoberfest, devfest, taipy, none)",
        enum: ["hacktoberfest", "devfest", "taipy", "none"],
        required: true,
      },
    ],
    handler: ({ event }) => {
      setSelectedEvent(event);
    },
  });

  useCopilotAction({
    name: "fetchData",
    description:
      "Fetch the Pull Request details with the given data. Set the default date range as October 1 - October 31, 2024 if it's not specified.",
    parameters: [
      {
        name: "event",
        type: "string",
        description:
          "Event name to switch to (hacktoberfest, devfest, taipy, none)",
        enum: ["hacktoberfest", "devfest", "taipy", "none"],
        required: true,
      },
      {
        name: "from",
        type: "date",
        description: "Start date of the range (mmm d,yyyy)",
        required: true,
      },
      {
        name: "to",
        type: "date",
        description: "End date of the range (mmm d,yyyy)",
        required: true,
      },
      {
        name: "username",
        type: "string",
        description: "Github username to search for",
        required: true,
      },
    ],
    handler: async ({ username, from, to, event }) => {
      try {
        setUserName(username);
        setDateRange({ from, to });
        setSelectedEvent(event);
        fetchPRDetails();
      } catch (error) {
        console.error("Error fetching PR details:", error);
      }
    },
  });

  // useCopilotAction({
  //   name: "filterByPRState",
  //   description:
  //     "Filters the current Pull Request(PR) data based on the state of the PR (open, closed, merged, or draft).",
  //   parameters: [
  //     {
  //       name: "state",
  //       type: "string",
  //       description: "PR state to filter by (open, closed, merged, draft)",
  //       enum: ["OPEN", "CLOSED", "MERGED", "DRAFT"],
  //       required: true,
  //     },
  //   ],
  //   handler: ({ state }) => {
  //     const filteredData = searchedData.filter(
  //       (pr) => pr.state.toLowerCase() == state.toLowerCase()
  //     );
  //     setSearchedData(filteredData);
  //   },
  // });

  return (
    <DataContext.Provider
      value={{
        selectedEvent,
        setSelectedEvent,
        dateRange,
        setDateRange,
        userName,
        setUserName,
        fetchPRDetails,
        allData,
        loadingState,
        shouldFetch,
        searchedData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within an UserInputProvider");
  }
  return context;
};
