import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useEffect } from "react";
import { BookTable } from "../../../context/tableBooking";
import { useFetchTableAvailabilityMutation } from "@/api/restaurant";
import { useRouter } from "next/router";

const bookingTimes = [
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 AM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
];

const TimePicker = () => {
  const router = useRouter();
  const restaurantId = router.query.restaurant_id as string;
  const bookTable = useContext(BookTable);
  const [fetchTableAvailabilty, { data }] = useFetchTableAvailabilityMutation();

  useEffect(() => {
    if (!bookTable?.date) return;
    (async () => {
      await fetchTableAvailabilty({
        date: bookTable?.date || new Date(),
        restaurant_id: restaurantId,
        table_id: bookTable?.tableId,
      });
    })();
  }, [bookTable?.date]);

  return (
    <Select value={bookTable?.time} onValueChange={bookTable?.setTime}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pick a time" />
      </SelectTrigger>
      <SelectContent className="max-h-[10rem]">
        {data?.map((time) => {
          return (
            <SelectItem
              disabled={!time.is_available}
              key={time.time}
              value={time.time}
            >
              {time.time}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TimePicker;
