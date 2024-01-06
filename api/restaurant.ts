import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseurl } from "@/config/api";
import { store } from "@/config/store";
import { ApiSuccess } from "@/types/api";

type AddRestaurantReq = {
  user_id: string;
  name: string;
  type: string;
  cover_pic: string;
  description: string;
  address: string;
  email: string;
  phone_no: string;
  cta: string;
};

type UpdateRestaurantReq = Omit<AddRestaurantReq, "user_id"> & {
  restaurant_id: string;
};

type AddRestaurantRes = {
  restaurant_id: string;
};
type UpdateRestaurantRes = {
  restaurant_id: string;
};

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseurl + "/api/restaurant",
    prepareHeaders: (headers) => {
      const state = store.getState();
      const accessToken = state.authentication.token;
      if (accessToken) headers.append("Authorization", `Bearer ${accessToken}`);
    },
  }),
  endpoints: (builder) => ({
    addRestaurant: builder.mutation<AddRestaurantRes, AddRestaurantReq>({
      query: (body) => ({
        url: "/create_restaurant",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiSuccess<AddRestaurantRes>) => {
        return response.data;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data;
      },
    }),
    updateRestaurant: builder.mutation<
      UpdateRestaurantRes,
      UpdateRestaurantReq
    >({
      query: (body) => ({
        url: "/update_restaurant",
        method: "PUT",
        body,
      }),
      transformResponse: (response: ApiSuccess<UpdateRestaurantRes>) => {
        return response.data;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data;
      },
    }),
  }),
});

export const { useAddRestaurantMutation, useUpdateRestaurantMutation } =
  restaurantApi;
