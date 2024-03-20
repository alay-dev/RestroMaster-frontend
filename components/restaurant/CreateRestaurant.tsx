import { useAppSelector } from "@/config/store";
import DashboardLayout from "../layout/DashboardLayout";
import { useFetchProfileQuery } from "@/api/users";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "solar-icon-set";
import Link from "next/link";

const CreateRestaurant = () => {
  const auth = useAppSelector((state) => state.authentication);
  const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);

  return (
    <div className="flex items-center justify-center h-[85vh]">
      <div className="w-full md:w-3/5 h-[36rem] bg-white rounded-md shadow-sm p-5 flex flex-col items-center justify-center">
        <img src="/images/dashboard/welcome.png" className="w-[60%]" />
        <h1 className="mt-4  text-2xl mb-2">
          Hi{" "}
          <span className="font-medium text-3xl">
            {user?.name?.split(" ")[0]}
          </span>
          , welcome to Restro master!{" "}
        </h1>
        <p className="text-sm text-gray-400">
          We&apos;re excited to have you along. Lets setup your restaurant and
          get started.
        </p>
        <Link href="/dashboard/onboarding">
          <Button className="mt-14 w-64 rounded-xl">
            Get started
            <ArrowRight className="ml-4" size={20} iconStyle="BoldDuotone" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateRestaurant;
