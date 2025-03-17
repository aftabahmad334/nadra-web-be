import {fetchBaseQuery,} from "@reduxjs/toolkit/query/react";
import { AuthActions } from "../feature/authentication";

const baseQuery = fetchBaseQuery({

    prepareHeaders: (headers, { getState }) => {
        const token = getState()?.authSlice?.token;
        headers.set("X-Api-Version", "1.0");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

/**
 * @name baseQueryWithReAuth
 * @param args
 * @param api
 * @param extraOptions
 * @description
 * This baseQuery is used for all API calls.
 * In this baseQuery we prepare the headers and add the token to the header.
 * And re-authentication is done if the token is expired.
 * if you want to change the base url for the API call.
 * @example
 *    baseQuery: (args, api, extraOptions) => {
 *        return baseQueryWithReAuth(args, api, extraOptions);
 *    }
 *
 * @example
 *   baseQuery:
 *
 * @author Ehtisham Ali
 * @date 01.04.2024
 *
 * @returns

 */
const baseQueryWithReAuth = async (
    args,
    api,
    extraOptions
) => {
    const result = await baseQuery(args, api, extraOptions);

    /**
     * @name
     * Conditions for re-authentication
     *  @description
     *  if the token is expired then logout the user
     */

    if (result?.error?.status === 401) {
        api.dispatch(AuthActions.logout());
    }

    /**
     * if the server is down then throw an error to the user and show an error message
     * to the user that the server is down or something went wrong
     */
    if (result?.error?.status === "FETCH_ERROR") {
        return {
            data: null,
            message: "Check Your Internet Connection or Server is Down",
            success: false,
        };
    }
    return result;
};

export default baseQueryWithReAuth;
