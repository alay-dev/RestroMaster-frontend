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
  picture: null | string;
};

type UpdateProfileReq = {
  user_id: string;
  name: string;
  phone_no: string;
};

type UpdateProfilePicReq = {
  profile_pic: string;
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
  tagTypes: ["me"],

  endpoints: (builder) => ({
    fetchProfile: builder.query<ProfileRes, string>({
      query: () => ({
        url: `/me`,
      }),
      providesTags: ["me"],
      transformResponse: (response: ApiSuccess<ProfileRes>) => {
        return response.data;
      },
    }),
    updateProfile: builder.mutation<ProfileRes, UpdateProfileReq>({
      query: (body) => ({
        url: `/update_user`,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiSuccess<ProfileRes>) => {
        return response.data;
      },
    }),
    updateProfilePic: builder.mutation<ProfileRes, UpdateProfilePicReq>({
      query: (body) => ({
        url: `/update_profile_pic`,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiSuccess<ProfileRes>) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useFetchProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfilePicMutation,
} = userApi;
