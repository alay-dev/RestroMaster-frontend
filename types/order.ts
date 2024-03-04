import { Dish } from "./dish";

export type OrderItem = Dish & {
  quantity: number;
};

export type Order = {
  id: string;
  created_at: Date;
  customer_name: string;
  customer_phone: null | string;
  order_items: OrderItem[];
  paid: boolean;
  order_total: number;
};
