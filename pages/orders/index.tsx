import { PageTitle } from "@/components/PageTitle";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { RoundedMagnifer } from "solar-icon-set";
import OrderTable from "./_views/OrderTable";
import { useAppSelector } from "@/config/store";
import { useFetchProfileQuery } from "@/api/users";
import { useFetchOrdersQuery } from "@/api/order";
import { skipToken } from "@reduxjs/toolkit/query";
import { useMemo } from "react";

const Orders = () => {
  const auth = useAppSelector((state) => state.authentication);
  const user = useFetchProfileQuery(auth.token ?? skipToken);
  const orders = useFetchOrdersQuery(user?.data?.restaurant?.id ?? skipToken);

  const active = useMemo(() => {
    if (!orders.data) return 0;
    let sum = 0;
    orders?.data?.map((order) => {
      if (!order?.paid) {
        sum = sum + 1;
      }
    });
    return sum;
  }, [orders.data]);

  const paid = useMemo(() => {
    if (!orders.data) return 0;
    let sum = 0;
    orders?.data?.map((order) => {
      if (order?.paid) {
        sum = sum + 1;
      }
    });
    return sum;
  }, [orders.data]);

  return (
    <DashboardLayout>
      <PageTitle
        title="Orders"
        actions={
          <Link href="/orders/new-order">
            <Button>Take Order</Button>
          </Link>
        }
      />
      <div className="bg-card rounded-lg p-4 mt-3">
        <div className="flex items-center justify-between mb-2">
          <ul className="flex items-center gap-8 text-sm border-b pb-2 text-gray-600 relative">
            <div className="absolute bottom-0 left-0 h-px w-28  bg-blue-600"></div>
            <li className="flex gap-2 items-center ">
              All Orders
              <div className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">
                {orders?.data?.length}
              </div>
            </li>
            <li className="flex gap-2 items-center ">
              Active{" "}
              <div className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">
                {active}
              </div>
            </li>
            <li className="flex gap-2 items-center ">
              Paid{" "}
              <div className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">
                {paid}
              </div>
            </li>
          </ul>
          <div className=" flex gap-1 items-center border rounded-lg px-2 ">
            <RoundedMagnifer size={20} color="#757575" />
            <Input
              placeholder="Search by customer name."
              className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0  border-0 text-sm placeholder:text-gray-400 w-[20rem]"
            />
          </div>
        </div>
        <OrderTable data={orders?.data || []} />
      </div>
    </DashboardLayout>
  );
};

export default Orders;
