import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { FETCH_PR_DETAILS_BY_DATE } from "./constants/queries";

export const useFetchPRDetails = (
  username,
  dateRange,
  setLoadingState,
  setError,
  shouldFetch,
  setShouldFetch
) => {
  const [allData, setAllData] = useState([]);

  const [fetchPRs, { loading, error, data }] = useLazyQuery(
    FETCH_PR_DETAILS_BY_DATE,
    {
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    const fetchAllPages = async () => {
      if (!shouldFetch) return;

      setAllData([]);
      setLoadingState("loading");
      let hasMore = true;
      let cursor = null;

      try {
        while (hasMore) {
          const { data } = await fetchPRs({
            variables: {
              searchQuery: `is:pr author:${username} created:${new Date(
                dateRange.from
              ).toISOString()}..${new Date(dateRange.to).toISOString()}`,
              afterCursor: cursor,
            },
          });

          const newPRs = data?.search.nodes || [];
          setAllData((prevData) => [...prevData, ...newPRs]);

          const pageInfo = data?.search.pageInfo || {};
          hasMore = pageInfo.hasNextPage;
          cursor = pageInfo.endCursor;
        }
      } catch (err) {
        console.error("Error fetching PR details:", err);
      } finally {
        setShouldFetch(false);
        setLoadingState("completed"); 
      }
    };

    fetchAllPages();
  }, [shouldFetch, fetchPRs]);

  return { allData };
};
