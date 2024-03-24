import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseurl } from "@/config/api";
import { ApiError, ApiSuccess } from "@/types/api";
import { User } from "@/types/user";

type LoginWithEmailAndPasswordProps = {
  email: string;
  password: string;
};

type LoginWithEmailAndPasswordRes = {
  token: string;
  user: User;
};

type SignupProps = {
  email: string;
  name: string;
  password: string;
};

type SignupRes = {
  user_id: string;
};

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseurl + "/api/users",
  }),
  endpoints: (builder) => ({
    loginWithEmailAndPassword: builder.mutation<
      LoginWithEmailAndPasswordRes,
      LoginWithEmailAndPasswordProps
    >({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      transformResponse: (
        response: ApiSuccess<LoginWithEmailAndPasswordRes>
      ) => {
        return response.data;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data;
      },
    }),
    loginWithGoogle: builder.mutation<LoginWithEmailAndPasswordRes, string>({
      query: (token) => ({
        url: "/login_with_google",
        method: "POST",
        body: {
          token: token,
        },
      }),
      transformResponse: (
        response: ApiSuccess<LoginWithEmailAndPasswordRes>
      ) => {
        return response.data;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data;
      },
    }),
    signup: builder.mutation<SignupRes, SignupProps>({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiSuccess<SignupRes>) => {
        return response.data;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data;
      },
    }),
    forgotPassword: builder.mutation<SignupRes, string>({
      query: (email) => ({
        url: `/forgot_password/${email}`,
      }),
      transformResponse: (response: ApiSuccess<SignupRes>) => {
        return response.data;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useLoginWithEmailAndPasswordMutation,
  useSignupMutation,
  useLoginWithGoogleMutation,
  useForgotPasswordMutation,
} = authenticationApi;
