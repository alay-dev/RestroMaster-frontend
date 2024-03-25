import { useFetchTableBookingsQuery } from "@/api/restaurant";
import { useFetchProfileQuery } from "@/api/users";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/config/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { format } from "date-fns";
import { UsersGroupRounded, BarChair } from "solar-icon-set";

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
      <div className="flex justify-center items-center w-full  bg-white rounded-2xl h-[20rem]">
        <p className="text-sm text-gray-400">
          You don&apos;t have any bookings yet
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full  bg-white rounded-lg h-full">
      <ul className="p-4 w-full">
        {tableBookings?.data?.map((booking) => {
          return (
            <li
              key={booking.id}
              className="flex   rounded-md p-2 border mb-2 hover:bg-gray-50 transition-all hover:shadow-sm"
            >
              <div className="flex-1">
                <h4 className="text-xs">{booking.customer_name}</h4>
                <div className="flex mt-2 gap-5 items-center">
                  <div className="flex gap-1 items-center">
                    <UsersGroupRounded />
                    <span className=" text-xs text-gray-500">
                      {booking?.no_of_guests || 1} persons
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <BarChair />
                    <span className=" text-xs text-gray-500">
                      {booking?.table_id}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-l border-gray-400 text-xs flex justify-center items-center pl-1 font-medium w-16">
                {booking.time}
              </div>

              {/* <div className="flex items-center gap-3 ">
                <Avatar>
                  <AvatarFallback>
                    {booking?.customer_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className=" text-sm leading-4">{booking.customer_name}</p>
                  <p className="text-xs text-gray-400">
                    +91 {booking?.phone_no}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <p className="text-black font-medium">{booking?.time}</p>
                {format(booking?.date, "do, MMM")}
              </div> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TableBookings;
