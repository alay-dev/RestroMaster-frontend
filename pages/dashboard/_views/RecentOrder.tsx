import { useFetchOrdersQuery } from "@/api/order";
import { useFetchProfileQuery } from "@/api/users";
import { useAppSelector } from "@/config/store";
import OrderStatusChip from "@/pages/orders/_components/OrderStatusChip";
import { skipToken } from "@reduxjs/toolkit/query";

const RecentOrder = () => {
  const auth = useAppSelector((state) => state.authentication);
  const user = useFetchProfileQuery(auth.token ?? skipToken);
  const orders = useFetchOrdersQuery(user?.data?.restaurant?.id ?? skipToken);

  return (
    <div className="flex-1 w-full p-4 bg-white rounded-2xl">
      <ul>
        {orders?.data?.map((order) => {
          return (
            <li
              key={order.id}
              className="flex items-center justify-between border-b py-2"
            >
              <div className="flex gap-5">
                <img
                  src={order?.order_items?.at(0)?.image?.at(0)}
                  alt=""
                  className="w-16 h-16 rounded-md overflow-hidden"
                />
                <div>
                  <p className="text-gray-400 text-sm mb-1">
                    {order.customer_name}
                  </p>
                  <OrderStatusChip status={order.paid ? "Paid" : "Unpaid"} />
                </div>
              </div>
              <p>₹ {order?.order_total}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentOrder;
