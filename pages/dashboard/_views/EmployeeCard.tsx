import { useFetchEmployeeQuery } from "@/api/employee";
import { useFetchProfileQuery } from "@/api/users";
import { useAppSelector } from "@/config/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { CallChatRounded } from "solar-icon-set";

const EmployeeCard = () => {
  const auth = useAppSelector((state) => state.authentication);
  const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);
  const employees = useFetchEmployeeQuery(user?.restaurant?.id ?? skipToken);

  if (employees?.data?.length === 0) {
    return (
      <div className="flex justify-center items-center w-full  bg-white rounded-2xl h-[20rem]">
        <p className="text-sm text-gray-400">
          You don&apos;t have any employees yet
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl  h-[20rem]">
      <ul className="p-4 ">
        {employees?.data?.map((employee) => {
          return (
            <li
              key={employee.id}
              className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 ">
                <img
                  className="w-10 h-10 overflow-hidden rounded-full"
                  src={employee.photo}
                  alt=""
                />
                <div>
                  <p className=" text-sm leading-4">{employee.first_name}</p>
                  <p className="text-xs text-gray-400">
                    {employee.designation}
                  </p>
                </div>
              </div>
              <div className="border-l w-10 flex items-center justify-center">
                <CallChatRounded iconStyle="Bold" color="#EF6C00" size={25} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmployeeCard;
