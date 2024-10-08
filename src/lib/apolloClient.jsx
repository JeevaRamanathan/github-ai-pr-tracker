"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ` + TOKEN,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
