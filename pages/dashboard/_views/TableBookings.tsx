import { useFetchTableBookingsQuery } from "@/api/restaurant";
import { useFetchProfileQuery } from "@/api/users";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/config/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { format } from "date-fns";

const TableBookings = () => {
  const auth = useAppSelector((state) => state.authentication);
  const user = useFetchProfileQuery(auth.token ?? skipToken);

  const tableBookings = useFetchTableBookingsQuery(
    user?.data?.restaurant?.id || "",
    {
      skip: !user?.data?.restaurant?.id,
    }
  );

  if (tableBookings?.data?.length === 0) {
    return (
      <div className="flex justify-center items-center w-full  bg-white rounded-2xl h-full">
        <p className="text-sm text-gray-400">
          You don&apos;t have any bookings yet
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full  bg-white rounded-2xl h-full">
      <ul className="p-4 w-full">
        {tableBookings?.data?.map((booking) => {
          return (
            <li
              key={booking.id}
              className="flex items-center justify-between py-3 "
            >
              <div className="flex items-center gap-3 ">
                <Avatar>
                  <AvatarFallback>
                    {booking?.customer_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className=" text-sm leading-4">{booking.customer_name}</p>
                  <p className="text-xs text-gray-400">
                    91 {booking?.phone_no}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <p className="text-black font-medium">{booking?.time}</p>
                {format(booking?.date, "do, MMM")}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TableBookings;
