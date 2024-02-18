import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseurl } from "@/config/api";
import { store } from "@/config/store";
import { ApiSuccess } from "@/types/api";
import { Restaurant, TableBooking } from "@/types/restaurant";

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

type BookTableReq = {
  restaurant_id: string;
  customer_name: string;
  phone_no: string;
  table_id: string;
  date: Date;
  time: string;
  note: string;
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
    fetchRestaurant: builder.query<Restaurant, string>({
      query: (restaurantId) => ({
        url: `/${restaurantId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiSuccess<Restaurant>) => {
        return response.data;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data;
      },
    }),
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
    fetchTableBookings: builder.query<TableBooking[], string>({
      query: (restaurant_id) => ({
        url: `/get_table_booking/${restaurant_id}`,
      }),
      transformResponse: (response: ApiSuccess<TableBooking[]>) => {
        return response.data;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data;
      },
    }),
    bookTable: builder.mutation<string, BookTableReq>({
      query: (body) => ({
        url: "/book_table",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiSuccess<string>) => {
        return response.data;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useAddRestaurantMutation,
  useUpdateRestaurantMutation,
  useBookTableMutation,
  useFetchTableBookingsQuery,
  useFetchRestaurantQuery,
} = restaurantApi;
