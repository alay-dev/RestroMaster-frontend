import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext } from "react";
import { BookTable } from "../../../context/tableBooking";

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
  const bookTable = useContext(BookTable);
  return (
    <Select value={bookTable?.time} onValueChange={bookTable?.setTime}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pick a time" />
      </SelectTrigger>
      <SelectContent className="max-h-[10rem]">
        {bookingTimes?.map((time) => {
          return (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TimePicker;
