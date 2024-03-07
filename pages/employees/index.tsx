import { useFetchEmployeeQuery } from "@/api/employee";
import { useFetchProfileQuery } from "@/api/users";
import { PageTitle } from "@/components/PageTitle";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/config/store";
import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { RoundedMagnifer } from "solar-icon-set";
import EmployeeTable from "./_views/EmployeeTable";

export default function Employees() {
  const auth = useAppSelector((state) => state.authentication);
  const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);
  const employees = useFetchEmployeeQuery(user?.restaurant?.id ?? skipToken);

  return (
    <DashboardLayout>
      <PageTitle
        title="Employees"
        actions={
          <Link href="/employees/new-employee">
            <Button className="w-max">Add employee</Button>
          </Link>
        }
      />
      <div className="bg-card rounded-lg p-4 mt-3">
        <div className="flex items-center justify-between mb-2">
          <ul className="flex items-center gap-8 text-sm border-b pb-2 text-gray-600 relative">
            <div className="absolute bottom-0 left-0 h-px w-28  bg-blue-600"></div>
            <li className="flex gap-2 items-center ">
              All Employees
              <div className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">
                {employees?.data?.length}
              </div>
            </li>
            {/* <li className="flex gap-2 items-center ">
              Active{" "}
              <div className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">
                {active}
              </div>
            </li> */}
            {/* <li className="flex gap-2 items-center ">
              Paid{" "}
              <div className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">
                {paid}
              </div>
            </li> */}
          </ul>
          <div className=" flex gap-1 items-center border rounded-lg px-2 ">
            <RoundedMagnifer size={20} color="#757575" />
            <Input
              placeholder="Search by employee name."
              className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0  border-0 text-sm placeholder:text-gray-400 w-[20rem]"
            />
          </div>
        </div>
        <EmployeeTable data={employees?.data || []} />
      </div>
    </DashboardLayout>
  );
}