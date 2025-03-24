import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../lib";

export const pressReleaseApi = createApi({
  reducerPath: "authService",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    create_press: builder.mutation({
      query: (body) => ({
        url: "/api/v1/press-release/create",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authenticationService;
