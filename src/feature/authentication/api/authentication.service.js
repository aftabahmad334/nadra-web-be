import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../../../lib";

export const authenticationService = createApi({
    reducerPath: "authService",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation({
        query: (body) => ({
            url: "/api/v1/auth/public/authenticate",
            method: "POST",
            body: body,
        }),
    }),
        register: builder.mutation({
        query: (body) => ({
            url: "/api/v1/auth/public/register",
            method: "POST",
            body,
        }),
    }),
    }),
});

export const {useLoginMutation, useRegisterMutation} = authenticationService;
