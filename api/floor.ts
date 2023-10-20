import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseurl } from "@/config/api";
import { store } from "@/config/store";
import { ApiSuccess } from "@/types/api";
import { Floor } from "@/types/floor";

type AddFloorProps = {
  floor_no: number;
  canvas: string;
  restaurant_id: string;
};

type UpdateFloorProps = AddFloorProps & { floor_id: string };

type AddFloorRes = {
  floor_id: string;
};

type UpdateFloorRes = {
  floor_id: string;
};

type fetchAllFloorsRes = Floor[];

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
  tagTypes: ["allFloors"],
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
      providesTags: ["allFloors"],
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
    updateFloor: builder.mutation<UpdateFloorRes, UpdateFloorProps>({
      query: (body) => ({
        url: "/update_floor",
        method: "PUT",
        body,
      }),
      transformResponse: (response: ApiSuccess<UpdateFloorRes>) => {
        return response.data;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useAddFloorMutation,
  useFetchFloorsQuery,
  useUpdateFloorMutation,
} = floorApi;
