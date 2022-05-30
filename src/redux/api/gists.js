import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectToken } from "../credentialSlice";

const baseUrl = `https://api.github.com/gists/`;

export const gistApi = createApi({
  baseQuery: fetchBaseQuery({
    method: "get",
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState());
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Accept application/json");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPublicGists: builder.query({
      query: (per_page, page) =>
        `public?per_page=${per_page}&page=${page}`,
      transformResponse: (response) =>
        response.reduce((acc, curr) => {
          acc.push({
            url: curr.url,
            created_at: curr.created_at,
            description: curr.description,
            files: curr.files,
            owner: curr.owner,
            id: curr.id,
          });
          return acc;
        }, []),
    }),
  }),
});

export const { useListPostsQuery } = gistApi;
