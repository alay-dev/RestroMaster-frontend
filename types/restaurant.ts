export interface Restaurant {
  id: string;
  name: string | null;
  type: string;
  cover_pic: string | null;
  description: string | null;
  phone_no: string | null;
  address: string | null;
  email: string | null;
  dish_category: string[];
  cta: null | string;
}

export interface TableBooking {
  id: string;
  customer_name: string;
  phone_no: string;
  table_id: string;
  date: Date;
  time: string;
  note: string | null;
  no_of_guests: number;
}

export interface TableAvailability {
  is_available: boolean;
  time: string;
}
