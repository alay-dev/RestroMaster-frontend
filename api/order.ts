import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseurl } from "@/config/api";
import { ApiSuccess } from "@/types/api";
import { store } from "@/config/store";
import { Order, OrderItem } from "@/types/order";

type CreateOrderProps = {
  restaurant_id: string;
  customer_name: string;
  customer_phone: string;
  order_total: number;
  order_items: OrderItem[];
};

type CreateOrderRes = {
  order_id: string;
};

type MarkOrderPaidRes = {
  order_id: string;
};

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseurl + "/api/order",
    prepareHeaders: (headers) => {
      const state = store.getState();
      const accessToken = state.authentication.token;
      if (accessToken) headers.append("Authorization", `Bearer ${accessToken}`);
    },
  }),
  tagTypes: ["orders"],

  endpoints: (builder) => ({
    createOrder: builder.mutation<string, CreateOrderProps>({
      query: (body) => ({
        url: "/create_order",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiSuccess<CreateOrderRes>) => {
        return response.data.order_id;
      },
    }),
    fetchOrders: builder.query<Order[], string>({
      query: (restaurant_id) => ({
        url: `/${restaurant_id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
      transformResponse: (response: ApiSuccess<Order[]>) => {
        return response.data;
      },
    }),
    markOrderPaid: builder.mutation<string, string>({
      query: (order_id) => ({
        url: `/mark_order_paid`,
        method: "POST",
        body: {
          order_id: order_id,
        },
      }),

      transformResponse: (response: ApiSuccess<MarkOrderPaidRes>) => {
        return response.data.order_id;
      },
    }),
  }),
});

export const {
  useFetchOrdersQuery,
  useCreateOrderMutation,
  useMarkOrderPaidMutation,
} = orderApi;
