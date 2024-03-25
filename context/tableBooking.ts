import { DispatchState } from "@/types/utils";
import { createContext } from "react";

export type BookTableContext = {
  tableId: string;
  setTableId: DispatchState<string>;
  date: Date | undefined;
  setDate: DispatchState<Date | undefined>;
  time: string;
  setTime: DispatchState<string>;
  guestCount: number | null;
  setGuestCount: DispatchState<number>;
  note: string;
  setNote: DispatchState<string>;
  phoneNo: string;
  setPhoneNo: DispatchState<string>;
  customerName: string;
  setCustomerName: DispatchState<string>;
};

export const BookTable = createContext<BookTableContext | undefined>(undefined);
export const BookTableProvider = BookTable.Provider;
