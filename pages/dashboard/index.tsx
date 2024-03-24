import { useFetchProfileQuery } from "@/api/users";
import EmployeeCard from "./_views/EmployeeCard";
import InitialLoading from "@/components/initialLoading/InitialLoading";
import DashboardLayout from "@/components/layout/DashboardLayout";
import RecentOrder from "@/pages/dashboard/_views/RecentOrder";
import CreateRestaurant from "@/components/restaurant/CreateRestaurant";
import StatChartCard from "@/components/statChartCard/StatChartCard";
import { useAppSelector } from "@/config/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { Sale, MoneyBag, GraphUp, ArrowRight } from "solar-icon-set";
import TableBookings from "@/pages/dashboard/_views/TableBookings";
import { PageTitle } from "@/components/PageTitle";
import Link from "next/link";

const Dashboard = () => {
  const auth = useAppSelector((state) => state.authentication);

  if (!auth.isInitialized) return <InitialLoading />;

  return (
    <DashboardLayout>
      <PageTitle title="Dashboard" />
      <div className="flex lg:flex-row flex-col gap-8 overflow-hidden mb-8 h-max">
        <div className=" w-full lg:w-2/5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-md  ">Overview</h3>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 p-5 pt-6 text-blue-500 bg-white rounded-3xl ">
              <Sale size={35} />
              <div className="mt-4">
                <h4 className="text-xs text-gray-400">Total sales</h4>
                <p>
                  ₹ <strong className="text-2xl font-medium">1,231</strong>
                </p>
              </div>
            </div>
            <div className="flex-1 p-5 pt-6 text-orange-500 bg-white rounded-3xl ">
              <MoneyBag size={35} />
              <div className="mt-4">
                <h4 className="text-xs text-gray-400">Expense</h4>
                <p>
                  ₹ <strong className="text-2xl font-medium">1,231</strong>
                </p>
              </div>
            </div>
            <div className="flex-1 p-5 pt-6 text-pink-500 bg-white rounded-3xl ">
              <GraphUp size={35} />
              <div className="mt-4">
                <h4 className="text-xs text-gray-400">Revenue</h4>
                <p>
                  ₹ <strong className="text-2xl font-medium">1,231</strong>
                </p>
              </div>
            </div>
          </div>
          <StatChartCard />
        </div>
        <div className="flex md:flex-row flex-col w-full  lg:w-3/5 gap-5">
          <div className="flex flex-col md:w-1/2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md  ">Bookings</h3>
              <div className=" py-1  cursor-pointer hover:underline ">
                <p className="text-xs text-orange-600">View all</p>
              </div>
            </div>
            <TableBookings />
          </div>
          <div className="relative flex items-center justify-start md:w-1/2">
            <img
              className="w-[90%] max-w-sm"
              src="/images/dashboard/tryPremium.svg"
              alt="Try premium"
            />
            <div className="absolute bottom-0 left-0 flex items-center justify-between w-full gap-3 p-5 bg-white bg-opacity-95 rounded-xl">
              <div>
                <h2 className="mb-1 text-xl font-medium">Try premium</h2>
                <p className="text-xs text-gray-400">
                  You will get more analysis and features.
                </p>
              </div>
              <div className="flex items-center justify-center bg-orange-300 rounded-full cursor-pointer w-14 h-14">
                <ArrowRight size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-6 lg:gap-8 mb-10">
        <div className="md:w-2/5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-md ">Employee</h3>
            <Link href="/employees">
              <div className=" py-1  cursor-pointer hover:underline ">
                <p className="text-xs text-orange-600">View all</p>
              </div>
            </Link>
          </div>
          <EmployeeCard />
        </div>
        <div className="flex flex-col md:w-3/5 ">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-md ">Recent order</h3>
            <Link href="/orders">
              <div className=" py-1  cursor-pointer hover:underline">
                <p className="text-xs text-orange-600">View all</p>
              </div>
            </Link>
          </div>
          <RecentOrder />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
