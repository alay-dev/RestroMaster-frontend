import React, { FC, ReactNode, useState } from "react";
import {
  ChefHat,
  Home,
  BarChair,
  Settings,
  Logout,
  DonutBitten as Dishes,
  DonutBitten,
  OvenMittsMinimalistic as OrderIcon,
  HamburgerMenu,
} from "solar-icon-set";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Poppins, Permanent_Marker } from "next/font/google";
import { reauthenticateUser } from "@/slices/authentication";
import { store, useAppSelector } from "@/config/store";
import { authenticationApi } from "@/api/authentication";
import { authKey } from "@/constants/storage";
import { useFetchProfileQuery } from "@/api/users";
import { skipToken } from "@reduxjs/toolkit/query";
import { navigation } from "@/constants/navigation";
import { Button } from "../ui/button";
import { useFetchFloorsQuery } from "@/api/floor";
import { useFetchDishQuery } from "@/api/dish";
import CreateRestaurant from "../restaurant/CreateRestaurant";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const permanentMarker = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
});

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const auth = useAppSelector((state) => state.authentication);
  const { data: user, isLoading: profileLoading } = useFetchProfileQuery(
    auth.token ?? skipToken
  );
  const { data: allFloors, isLoading: allFloorsLoading } = useFetchFloorsQuery(
    user?.restaurant?.id ?? skipToken
  );
  const { data: dishes } = useFetchDishQuery(user?.restaurant?.id ?? skipToken);

  const handleLogout = () => {
    sessionStorage.removeItem(authKey);
    store.dispatch(reauthenticateUser());
    authenticationApi.util.resetApiState();
    router.push("/");
  };

  if (!auth.isInitialized || profileLoading) {
    return null;
  }

  return (
    <div className={cn("flex w-full md:pl-24 ", poppins.className)}>
      <nav className="fixed top-0 left-0 hidden md:flex flex-col items-center w-24 h-screen py-5 text-white bg-blue-500 ">
        <ChefHat iconStyle="BoldDuotone" size={35} />
        <ul className="flex flex-col items-center flex-1 w-full mt-16">
          {navigation?.map((nav) => {
            return (
              <li
                className={cn(
                  "flex items-center justify-center w-full h-12 pl-1",
                  router.pathname.includes(nav.path) &&
                    "border-l-4 border-white bg-blue-400  pl-0 "
                )}
                key={nav.path}
              >
                <Link href={nav.path}>
                  <nav.icon iconStyle="BoldDuotone" size={25} />
                </Link>
              </li>
            );
          })}
        </ul>
        <Logout
          className="cursor-pointer"
          onClick={handleLogout}
          iconStyle="BoldDuotone"
          size={30}
        />
      </nav>
      <div className="flex-1 bg-gray-100 w-full">
        <header className="flex items-center justify-between w-full h-16 px-4 border-b">
          <Sheet>
            <SheetTrigger>
              <div className="flex md:hidden">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsNavOpen(true)}
                >
                  <HamburgerMenu size={22} />
                </Button>
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="h-full">
              <h1
                className={cn(
                  "text-3xl font-light text-blue-600",
                  permanentMarker.className
                )}
              >
                <span>Restro</span>
                <span className="text-2xl text-black/60"> Master</span>
              </h1>
              <nav className="mt-16 h-full ">
                <ul>
                  {navigation?.map((nav) => {
                    return (
                      <Link key={nav.path} href={nav.path}>
                        <li
                          className={cn(
                            "flex items-center  w-full h-10 gap-3 px-2",
                            router.pathname.includes(nav.path) &&
                              " rounded-lg bg-gray-50  "
                          )}
                        >
                          <nav.icon
                            iconStyle="BoldDuotone"
                            size={23}
                            color="#1565C0"
                          />

                          <p
                            className={cn(
                              "text-sm text-gray-500",
                              router.pathname.includes(nav.path) &&
                                "font-medium text-blue-600"
                            )}
                          >
                            {nav.name}
                          </p>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
                <Button onClick={handleLogout} className="mt-10 w-full">
                  Log out
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="md:flex hidden items-center gap-4 ">
            {allFloors?.length ? (
              <Link href={`/book-table/${user?.restaurant?.id}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs  bg-transparent  border-blue-500 font-light  text-blue-600"
                >
                  Book table
                </Button>
              </Link>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      disabled
                      size="sm"
                      variant="outline"
                      className="text-xs  bg-transparent  border-blue-500 font-light "
                    >
                      Book table
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white">
                    <p className="text-xs">
                      Complete your floor setup first to book table
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {user?.restaurant?.id && dishes?.length ? (
              <Link href={`/orders/new-order`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs  bg-transparent  border-blue-500 font-light   text-blue-600"
                >
                  Take order
                </Button>
              </Link>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      disabled
                      size="sm"
                      variant="outline"
                      className="text-xs  bg-transparent  border-blue-500 font-light"
                    >
                      Take order
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white">
                    <p className="text-xs">Add dish to take orders</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="md:hidden block">
            <Avatar>
              <AvatarImage src={user?.picture || ""} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="min-h-screen p-3 md:p-6 pt-3 bg-gray-100">
          {user?.restaurant?.id ||
          router.pathname === "/dashboard/onboarding" ? (
            children
          ) : (
            <CreateRestaurant />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
