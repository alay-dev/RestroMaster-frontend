import { useFetchEmployeeQuery } from "@/api/employee";
import { useFetchProfileQuery } from "@/api/users";
import { useAppSelector } from "@/config/store";
import { skipToken } from "@reduxjs/toolkit/query";

const EmployeeCard = () => {
  const auth = useAppSelector((state) => state.authentication);
  const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);
  const employees = useFetchEmployeeQuery(user?.restaurant?.id ?? skipToken);

  return (
    <div className="w-full bg-white rounded-2xl">
      <ul className="p-4">
        {employees?.data?.map((employee) => {
          return (
            <li
              key={employee.id}
              className="flex items-center justify-between py-3 "
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
              <p className="text-sm text-gray-400">
                <strong className="text-black font-medium">35 hr</strong>/week
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmployeeCard;
