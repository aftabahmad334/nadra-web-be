import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "../../../lib/baseQuery.js";


const mrvService = createApi({
    baseQuery:baseQueryWithReAuth,
    reducerPath: "mrv",
    tagTypes: ["MRV"],
    endpoints: (builder) => ({
        createMRV: builder.mutation({
            query: (data) => ({
                url: "/api/v1/mrv/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["MRV"],
        }),
        getAllMRV: builder.query({
            query: () => ({
                url: "/api/v1/mrv/public/getAll",
                method: "GET",
            }),
            providesTags: ["MRV"],
        }),
    }),
})


export default { mrvService }
export const {useCreateMRVMutation,useGetAllMRVQuery} = mrvService