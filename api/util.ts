import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseurl } from "@/config/api";
import { ApiSuccess } from "@/types/api";
import { store } from "@/config/store";

type FetchPhotosRes = {
  img: string;
  thumb: string;
}[];

export const utilApi = createApi({
  reducerPath: "utilApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseurl + "/api/util",
    prepareHeaders: (headers) => {
      const state = store.getState();
      const accessToken = state.authentication.token;
      if (accessToken) headers.append("Authorization", `Bearer ${accessToken}`);
    },
  }),
  endpoints: (builder) => ({
    fetchPhotos: builder.mutation<FetchPhotosRes, string>({
      query: (keyword) => ({
        url: `/get_photos/${keyword}`,
      }),
      transformResponse: (response: ApiSuccess<FetchPhotosRes>) => {
        return response.data;
      },
    }),
  }),
});

export const { useFetchPhotosMutation } = utilApi;
