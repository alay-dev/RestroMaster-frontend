import React, { FC, ReactNode } from "react";
import {
  ChefHat,
  Home,
  BarChair,
  Settings,
  Logout,
  DonutBitten as Dishes,
  DonutBitten,
  OvenMittsMinimalistic as OrderIcon,
} from "solar-icon-set";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { reauthenticateUser } from "@/slices/authentication";
import { store, useAppSelector } from "@/config/store";
import { authenticationApi } from "@/api/authentication";
import { authKey } from "@/constants/storage";
import { useFetchProfileQuery } from "@/api/users";
import { skipToken } from "@reduxjs/toolkit/query";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.authentication);
  const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);

  const handleLogout = () => {
    sessionStorage.removeItem(authKey);
    store.dispatch(reauthenticateUser());
    authenticationApi.util.resetApiState();
    router.push("/");
  };

  return (
    <div className={cn("flex w-full pl-24 ", poppins.className)}>
      <nav className="fixed top-0 left-0 flex flex-col items-center w-24 h-screen py-5 text-white bg-blue-500">
        <ChefHat iconStyle="BoldDuotone" size={35} />
        <ul className="flex flex-col items-center flex-1 w-full mt-16">
          <div
            className={cn(
              "flex items-center justify-center w-full h-12 pl-1",
              router.pathname.includes("/dashboard") &&
                "border-l-4 border-white bg-blue-400  pl-0 "
            )}
          >
            <Link href="/dashboard">
              <Home iconStyle="BoldDuotone" size={25} />
            </Link>
          </div>
          <div
            className={cn(
              "flex items-center justify-center w-full h-12 pl-1",
              router.pathname.includes("/table-view") &&
                "border-l-4 border-white bg-blue-400 pl-0  "
            )}
          >
            <Link href="/table-view">
              <BarChair iconStyle="BoldDuotone" size={25} />
            </Link>
          </div>
          <div
            className={cn(
              "flex items-center justify-center w-full h-12  pl-1",
              router.pathname.includes("/dishes") &&
                "border-l-4 border-white bg-blue-400  pl-0 "
            )}
          >
            <Link href="/dishes">
              <DonutBitten iconStyle="BoldDuotone" size={25} />
            </Link>
          </div>
          <div
            className={cn(
              "flex items-center justify-center w-full h-12  pl-1",
              router.pathname.includes("/orders") &&
                "border-l-4 border-white bg-blue-400  pl-0 "
            )}
          >
            <Link href="/orders">
              <OrderIcon iconStyle="BoldDuotone" size={25} />
            </Link>
          </div>
          <div
            className={cn(
              "flex items-center justify-center w-full  h-12 pl-1",
              router.pathname.includes("/profile") &&
                "border-l-4 border-white bg-blue-400 pl-0 "
            )}
          >
            <Link href="/profile">
              <Settings iconStyle="BoldDuotone" size={25} />
            </Link>
          </div>
        </ul>
        <Logout
          className="cursor-pointer"
          onClick={handleLogout}
          iconStyle="BoldDuotone"
          size={30}
        />
      </nav>
      <div className="flex-1 bg-gray-100">
        <header className="flex items-center justify-between w-full h-16 px-4 border-b">
          <div>
            <h2 className="">
              <strong className="text-xl text-green-600 font-medium">
                Welcome
              </strong>
              , {user?.name?.split(" ")[0]}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {/* <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p>Adam </p> */}
          </div>
        </header>
        <div className="min-h-screen p-6 pt-3 bg-gray-100">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
