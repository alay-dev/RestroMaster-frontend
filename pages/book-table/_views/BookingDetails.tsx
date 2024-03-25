import { Button } from "@/components/ui/button";
import DatePicker from "../_components/DatePicker";
import TimePicker from "../_components/TimePicker";
import { useContext } from "react";
import { BookTable } from "../../../context/tableBooking";
import { cn } from "@/lib/utils";
import { useBookTableMutation } from "@/api/restaurant";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/components/common/PhoneInput";
import { ApiError } from "@/types/api";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const BookingDetails = () => {
  const bookTableContext = useContext(BookTable);
  const [bookTable] = useBookTableMutation();
  const { toast } = useToast();

  const router = useRouter();
  const restaurantId = router.query.restaurant_id as string;

  const handleBookTable = async () => {
    if (
      !bookTableContext?.customerName ||
      !bookTableContext?.date ||
      !bookTableContext?.time ||
      !bookTableContext?.guestCount
    ) {
      return;
    }
    try {
      await bookTable({
        customer_name: bookTableContext?.customerName,
        date: bookTableContext?.date,
        note: bookTableContext?.note || "",
        phone_no: bookTableContext?.phoneNo,
        restaurant_id: restaurantId,
        table_id: bookTableContext?.tableId,
        time: bookTableContext?.time,
        no_of_guests: bookTableContext.guestCount,
      }).unwrap();

      toast({
        variant: "default",
        title: "Your table has been booked",
      });
    } catch (e) {
      const error = e as ApiError;
      toast({
        variant: "destructive",
        title: "Oops, something went wrong",
        description: error.message,
      });
    }
  };

  return (
    <section className="p-3 bg-gray-100 h-screen">
      <div className="mb-4">
        <div>
          <h1 className="uppercase text-sm text-gray-400 mb-1">Seat details</h1>
          <div className="bg-card p-4 rounded-lg">
            <h2>{bookTableContext?.tableId}</h2>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h1 className="uppercase text-sm text-gray-400 mb-1">Guest Details</h1>

        <div className="bg-card p-4 rounded-lg flex flex-col ">
          <label className="text-gray-500 text-sm inline-block " htmlFor="name">
            Name
          </label>
          <Input
            className="outline-gray-600 focus:border-none mb-4"
            id="name"
            value={bookTableContext?.customerName}
            onChange={(e) => bookTableContext?.setCustomerName(e.target.value)}
          />
          <label
            className="text-gray-500 text-sm inline-block "
            htmlFor="phone"
          >
            Phone
          </label>
          <PhoneInput
            setCountryCode={() => null}
            onChange={(e) => bookTableContext?.setPhoneNo(e?.target?.value)}
          />
          <label className="text-gray-500 text-sm inline-block mt-4">
            No. of guests
          </label>
          <div className="flex gap-3 items-center mb-4">
            {[1, 2, 3, 4, 5]?.map((item) => {
              return (
                <div
                  key={item}
                  className={cn(
                    "bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center text-sm",
                    bookTableContext?.guestCount === item &&
                      "bg-orange-500 text-white"
                  )}
                  onClick={() => bookTableContext?.setGuestCount(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <label className="text-gray-500 text-sm inline-block " htmlFor="note">
            Note
          </label>
          <Textarea
            value={bookTableContext?.note}
            onChange={(e) => bookTableContext?.setNote(e?.target?.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <h1 className="uppercase text-sm text-gray-400 mb-1">Date and Time</h1>
        <div className="bg-card p-4 rounded-lg flex flex-col items-center gap-3">
          {bookTableContext ? (
            <DatePicker
              date={bookTableContext?.date || new Date()}
              onChange={(date) => bookTableContext?.setDate(date)}
            />
          ) : null}
          <TimePicker />
        </div>
      </div>
      <div className="">
        <Button onClick={handleBookTable} className="w-full">
          Book table
        </Button>
      </div>
    </section>
  );
};

export default BookingDetails;
