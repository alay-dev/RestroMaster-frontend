import { useFetchTableBookingsQuery } from "@/api/restaurant";
import { useFetchProfileQuery } from "@/api/users";
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
                <img
                  className="w-10 h-10 overflow-hidden rounded-full"
                  src="https://github.com/shadcn.png"
                  alt=""
                />
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
