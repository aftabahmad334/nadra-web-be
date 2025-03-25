import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../lib";

export const pressReleaseApi = createApi({
  reducerPath: "pressReleaseApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createPress: builder.mutation({
      query: (body) => ({
        url: "/api/v1/press-release/create",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export the hook
export const { useCreatePressMutation } = pressReleaseApi;
