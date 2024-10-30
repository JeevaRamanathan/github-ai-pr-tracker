import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  GitPullRequestClosed,
  GitPullRequestArrow,
  GitMerge,
} from "lucide-react";
// import {FETCH_PR_DETAILS_BY_USER,FETCH_PR_DETAILS_BY_DATE} from "@/lib/constants/queries"
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getPRStateIcon = (state) => {
  if (state == "CLOSED") {
    return <GitPullRequestClosed className="text-red-700" />;
  } else if (state == "OPEN") {
    return <GitPullRequestArrow className="text-green-600" />;
  } else if (state == "MERGED") {
    return <GitMerge className="text-purple-700" />;
  } else if (state == "DRAFT") {
    return <GitPullRequestArrow className="text-gray-400" />;
  }
};

export const getLinesChanged = (add, del) => {
  return (
    <div>
      <span className="text-green-700 mr-2"> +{add}</span>
      <span className="text-red-600"> -{del}</span>
    </div>
  );
};

export const getPRStatusBadge = (state) => {
  if (state == "CLOSED") {
    return (
      <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
        Closed
      </span>
    );
  } else if (state == "OPEN") {
    return (
      <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
        Open
      </span>
    );
  } else if (state == "MERGED") {
    return (
      <span class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
        Merged
      </span>
    );
  } else if (state == "DRAFT") {
    return (
      <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
        Draft
      </span>
    );
  }
};

export function transformDataToResultTable(data) {
  return data.map((pr) => ({
    prStatus: pr.state,
    title: pr.title,
    url: pr.url,
    state: pr.state,
    createdAt: new Date(pr.createdAt).toLocaleString(),
    mergedAt: pr.mergedAt && new Date(pr.mergedAt).toLocaleString(),
    linesChanged: { additions: pr.additions, deletions: pr.deletions },
    diffLink: pr.url + "/files",
    repoOwner: pr.repository.nameWithOwner,
  }));
}

//has haacktoberfest or hacktoberfest-accepted label/tag in pr
const hasHacktoberfestLabel = (labels) => {
  return labels.nodes.some(
    (label) =>
      label.name.toLowerCase() === "hacktoberfest" ||
      label.name.toLowerCase() === "hacktoberfest-accepted"
  );
};

//has hacktoberfest topic in Repository
const hasHacktoberfestTopic = (repository) => {
  return repository.repositoryTopics.nodes.some(
    (topic) => topic.topic.name.toLowerCase() === "hacktoberfest"
  );
};

export const getDevFestRepos = async () => {
  try {
    const response = await fetch("/api/scrape");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching DevFest repositories:", error);
    throw error;
  }
};

export const getHacktoberfestData = (data) => {
  const uniquePRs = new Set();
  const filteredData = data.filter((pr) => {
    const labelsMatch = hasHacktoberfestLabel(pr.labels);
    const topicsMatch = hasHacktoberfestTopic(pr.repository);
    if ((labelsMatch || topicsMatch) && !uniquePRs.has(pr.number)) {
      uniquePRs.add(pr.number);
      return true;
    }
    return false;
  });
  return filteredData;
};

export const getDevfestData = (data, devFestRepos) => {
  const filteredData = data.filter((pr) => {
    return devFestRepos.some(
      (repo) => repo.toLowerCase() === pr.repository.nameWithOwner.toLowerCase()
    );
  });
  return filteredData;
};

export const getTaipyData = (data) => {
  const filteredData = data.filter((pr) => {
    return (
      pr.repository.nameWithOwner.toLowerCase() == "avaiga/taipy" &&
      hasHacktoberfestLabel(pr.labels)
    );
  });

  return filteredData;
};

export const downloadCSV = (data, toast) => {
  try {
    const csvContent = `${[
      "PR Status",
      "PR Title",
      "Created At",
      "Merged At",
      "Lines Changed",
      "Repository Owner",
      "Diff Checker",
    ].join(",")}\n${data
      .map(
        (pr) =>
          `"${pr.state}", "${pr.title}", "${pr.createdAt}", "${pr.mergedAt}", "+${pr.linesChanged.additions} -${pr.linesChanged.deletions}", "${pr.repoOwner}","${pr.diffLink}"`
      )
      .join("\n")}`;
    const encodedURI = `data:text/csv;charset=utf-8,${encodeURIComponent(
      csvContent
    )}`;
    const link = document.createElement("a");
    link.setAttribute("href", encodedURI);
    link.setAttribute("download", "pull_request_data.csv");
    document.body.appendChild(link);
    link.click();
    toast({
      title: "Download started successfully!",
    });
  } catch (e) {
    console.log(e);
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong!",
    });
  }
};
