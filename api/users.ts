import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseurl } from "@/config/api";
import { ApiSuccess } from "@/types/api";
import { store } from "@/config/store";
import { Restaurant } from "@/types/restaurant";

type ProfileRes = {
  id: string;
  name: string;
  phone_no: null | string;
  email: string;
  restaurant: null | Restaurant;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseurl + "/api/users",
    prepareHeaders: (headers) => {
      const state = store.getState();
      const accessToken = state.authentication.token;
      if (accessToken) headers.append("Authorization", `Bearer ${accessToken}`);
    },
  }),

  endpoints: (builder) => ({
    fetchProfile: builder.query<ProfileRes, string>({
      query: () => ({
        url: `/me`,
      }),
      transformResponse: (response: ApiSuccess<ProfileRes>) => {
        return response.data;
      },
    }),
  }),
});

export const { useFetchProfileQuery } = userApi;
