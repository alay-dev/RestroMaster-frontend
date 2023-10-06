import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseurl } from "@/config/api";
import { store } from "@/config/store";
import { ApiSuccess } from "@/types/api";

type AddRestaurantProps = {
  user_id: string;
  name: string;
  type: string;
  cover_pic: string;
  description: string;
  address: string;
  email: string;
  phone_no: string;
};

type AddRestaurantRes = {
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
    addRestaurant: builder.mutation<AddRestaurantRes, AddRestaurantProps>({
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
  }),
});

export const { useAddRestaurantMutation } = restaurantApi;
