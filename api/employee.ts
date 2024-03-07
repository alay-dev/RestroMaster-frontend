import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseurl } from "@/config/api";
import { ApiSuccess } from "@/types/api";
import { store } from "@/config/store";
import { Dish } from "@/types/dish";
import { Employee } from "@/types/employee";

type fetchDishRes = Dish[];

type AddEmployeeProps = {
  restaurant_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  designation: string;
  date_of_birth: Date;
  photo: string;
};

type AddEmployeeRes = {
  employee_id: string;
};

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseurl + "/api/employee",
    prepareHeaders: (headers) => {
      const state = store.getState();
      const accessToken = state.authentication.token;
      if (accessToken) headers.append("Authorization", `Bearer ${accessToken}`);
    },
  }),
  tagTypes: ["employee"],

  endpoints: (builder) => ({
    fetchEmployee: builder.query<Employee[], string>({
      query: (restaurant_id) => ({
        url: `/get_employee/${restaurant_id}`,
      }),
      transformResponse: (response: ApiSuccess<Employee[]>) => {
        return response.data;
      },
      providesTags: ["employee"],
    }),
    addEmployee: builder.mutation<AddEmployeeRes, AddEmployeeProps>({
      query: (body) => ({
        url: `/add_employee`,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiSuccess<AddEmployeeRes>) => {
        return response.data;
      },
    }),
  }),
});

export const { useFetchEmployeeQuery, useAddEmployeeMutation } = employeeApi;
