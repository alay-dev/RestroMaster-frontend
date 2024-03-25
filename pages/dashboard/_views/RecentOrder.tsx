import { useFetchOrdersQuery } from "@/api/order";
import { useFetchProfileQuery } from "@/api/users";
import { useAppSelector } from "@/config/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { CheckCircle, Tag, BagSmile, BarChair } from "solar-icon-set";

const RecentOrder = () => {
  const auth = useAppSelector((state) => state.authentication);
  const user = useFetchProfileQuery(auth.token ?? skipToken);
  const orders = useFetchOrdersQuery(user?.data?.restaurant?.id ?? skipToken);

  if (orders?.data?.length === 0) {
    return (
      <div className="flex justify-center items-center w-full  bg-white rounded-2xl h-[20rem]">
        <p className="text-sm text-gray-400">
          You don&apos;t have any orders yet
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full p-4 bg-white rounded-2xl h-[20rem]">
      <ul className=" flex flex-col gap-2">
        {orders?.data?.map((order) => {
          return (
            <li
              key={order.id}
              className="flex items-center justify-between border rounded-md p-2 hover:bg-gray-50 hover:shadow-sm transition-all"
            >
              <div className="flex-1">
                <h4 className="text-sm">{order?.customer_name}</h4>
                <div className="flex mt-2 gap-4">
                  <div className="flex gap-1 items-center">
                    <Tag />
                    <span className="text-xs text-gray-500">
                      ₹ {order?.order_total}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <BagSmile />
                    <span className="text-xs text-gray-500">
                      {order?.order_items?.length} items
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <BarChair />
                    <span className=" text-xs text-gray-500">
                      {/* {order?.table_id} */} N/A
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-l flex items-center justify-center px-3">
                <span className="text-xs text-blue-500 hover:text-blue-600 underline cursor-pointer">
                  View items
                </span>
              </div>
              <div className="border-l w-10 flex items-center justify-center">
                <CheckCircle iconStyle="Bold" color="#EF6C00" size={25} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentOrder;
