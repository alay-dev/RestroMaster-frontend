import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseurl } from "@/config/api";
import { store } from "@/config/store";
import { ApiSuccess } from "@/types/api";

type AddFloorProps = {};

type AddFloorRes = {};

type fetchAllFloorsRes = {};

export const floorApi = createApi({
  reducerPath: "floorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseurl + "/api/floor",
    prepareHeaders: (headers) => {
      const state = store.getState();
      const accessToken = state.authentication.token;
      if (accessToken) headers.append("Authorization", `Bearer ${accessToken}`);
    },
  }),
  endpoints: (builder) => ({
    fetchFloors: builder.query<fetchAllFloorsRes, string>({
      query: (restaurant_id) => ({
        url: `/${restaurant_id}`,
      }),
      transformResponse: (response: ApiSuccess<fetchAllFloorsRes>) => {
        return response.data;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data;
      },
    }),
    addFloor: builder.mutation<AddFloorRes, AddFloorProps>({
      query: (body) => ({
        url: "/add_floor",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiSuccess<AddFloorRes>) => {
        return response.data;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data;
      },
    }),
  }),
});

export const { useAddFloorMutation, useFetchFloorsQuery } = floorApi;
