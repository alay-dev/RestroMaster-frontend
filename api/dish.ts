import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseurl } from "@/config/api";
import { ApiSuccess } from "@/types/api";
import { store } from "@/config/store";
import { Restaurant } from "@/types/restaurant";
import { Dish } from "@/types/dish";

type fetchDishRes = Dish[];

type AddDishProps = {
  restaurant_id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  category: string;
};

type AddDishRes = {
  dish_id: string;
};

export const dishApi = createApi({
  reducerPath: "dishApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseurl + "/api/dish",
    prepareHeaders: (headers) => {
      const state = store.getState();
      const accessToken = state.authentication.token;
      if (accessToken) headers.append("Authorization", `Bearer ${accessToken}`);
    },
  }),
  tagTypes: ["dish"],

  endpoints: (builder) => ({
    fetchDish: builder.query<fetchDishRes, string>({
      query: (restaurant_id) => ({
        url: `/get_dishes/${restaurant_id}`,
      }),
      transformResponse: (response: ApiSuccess<fetchDishRes>) => {
        return response.data;
      },
      providesTags: ["dish"],
    }),
    addDish: builder.mutation<AddDishRes, AddDishProps>({
      query: (body) => ({
        url: `/add_dish`,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiSuccess<AddDishRes>) => {
        return response.data;
      },
    }),
  }),
});

export const { useFetchDishQuery, useAddDishMutation } = dishApi;
