import { gql } from "@apollo/client";

export const FETCH_PR_DETAILS_BY_USER = gql`
  query ($username: String!, $afterCursor: String) {
    user(login: $username) {
      pullRequests(
        first: 50
        after: $afterCursor
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          title
          number
          url
          state
          additions
          deletions
          createdAt
          mergedAt
          labels(first: 100) {
            nodes {
              name
            }
          }
          repository {
            name
            nameWithOwner
            repositoryTopics(first: 100) {
              nodes {
                topic {
                  name
                }
              }
            }
            labels(first: 100) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const FETCH_PR_DETAILS_BY_DATE = gql`
  query ($searchQuery: String!, $afterCursor: String) {
    search(query: $searchQuery, type: ISSUE, first: 100, after: $afterCursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ... on PullRequest {
          title
          number
          url
          state
          additions
          deletions
          createdAt
          mergedAt
          labels(first: 100) {
            nodes {
              name
            }
          }
          repository {
            name
            nameWithOwner
            repositoryTopics(first: 100) {
              nodes {
                topic {
                  name
                }
              }
            }
            labels(first: 100) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
