import { useState } from "react";

import BookingDetails from "./_views/BookingDetails";
import {
  BookTableContext,
  BookTableProvider,
} from "../../context/tableBooking";
import { TableObject } from "@/types/floor";
import Restaurant from "./_views/Restaurant";
import FloorView from "./_views/FloorView";

export type BookTableSteps =
  | "restaurant"
  | "seat-selection"
  | "booking-details"
  | "payment";

const BookTable = () => {
  const [step, setStep] = useState<BookTableSteps>("restaurant");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [tableId, setTableId] = useState("");
  const [guestCount, setGuestCount] = useState<number>(1);
  const [phoneNo, setPhoneNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [note, setNote] = useState("");

  const values: BookTableContext = {
    date,
    setDate,
    time,
    setTime,
    tableId,
    setTableId,
    guestCount,
    setGuestCount,
    note,
    setNote,
    customerName,
    setCustomerName,
    phoneNo,
    setPhoneNo,
  };

  if (step === "restaurant") {
    return <Restaurant setStep={() => setStep("seat-selection")} />;
  }

  if (step === "booking-details")
    return (
      <BookTableProvider value={values}>
        <BookingDetails />
      </BookTableProvider>
    );

  if (step === "payment") {
    return (
      <>
        <h1>Payment</h1>
      </>
    );
  }

  if (step === "seat-selection") {
    return (
      <BookTableProvider value={values}>
        <FloorView setStep={setStep} setTableId={setTableId} />
      </BookTableProvider>
    );
  }
  return null;
};

export default BookTable;
