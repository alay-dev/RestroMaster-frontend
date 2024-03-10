import { useState } from "react";
import { cn } from "@/lib/utils";
import DishCard from "@/pages/dishes/_components/DishCard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  PaperBin,
  Bacteria,
  Wineglass,
  SunFog,
  AddSquare,
} from "solar-icon-set";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AddDishDrawer from "@/pages/dishes/_components/AddDishDrawer";
import InitialLoading from "@/components/initialLoading/InitialLoading";
import { useAppSelector } from "@/config/store";
import { useFetchProfileQuery } from "@/api/users";
import { skipToken } from "@reduxjs/toolkit/query";
import { useFetchDishQuery } from "@/api/dish";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageTitle } from "@/components/PageTitle";

const DISH_TYPES: {
  title: "All" | "Starters" | "Main courses" | "Desserts" | "Drinks";
  icon: any;
}[] = [
  { title: "All", icon: "" },
  { title: "Starters", icon: <SunFog size={20} /> },
  { title: "Main courses", icon: <Bacteria size={20} /> },
  { title: "Desserts", icon: <PaperBin size={20} /> },
  { title: "Drinks", icon: <Wineglass size={20} /> },
];

const Dishes = () => {
  const [dishType, setDishType] = useState<string>("All");
  const [addDishModal, setAddDishModal] = useState(false);

  const auth = useAppSelector((state) => state.authentication);
  const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);
  const { data: dishes } = useFetchDishQuery(user?.restaurant?.id ?? skipToken);

  const dishTypes = user?.restaurant?.dish_category;

  if (!auth.isInitialized) return <InitialLoading />;

  if (auth.isInitialized && !dishes?.length) {
    return (
      <DashboardLayout>
        <PageTitle title="Dishes" />
        <div className="flex items-center justify-center h-[75vh]">
          <div className="w-3/5 h-[36rem] bg-white rounded-md shadow-sm p-5 flex flex-col items-center justify-center">
            <img
              src="/images/dish/noDish.jpg"
              className="w-[90%] h-[22rem] object-contain"
              alt="no dish"
            />
            <h1 className="text-2xl mb-2">No Dish</h1>
            <p className="text-sm text-gray-400">
              You dont have any dish yet. Add a dish and get your customers
            </p>
            <Link href={user?.restaurant ? "/dishes/add" : "/dashboard"}>
              <Button className="mt-10 w-64 rounded-xl">Add dish</Button>
            </Link>
          </div>
        </div>
        <Sheet
          open={addDishModal}
          onOpenChange={() => setAddDishModal(!addDishModal)}
        >
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add a dish</SheetTitle>
              <SheetDescription>
                <AddDishDrawer setAddDishModal={setAddDishModal} />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageTitle title="Dishes" />
      <div className="flex items-center gap-3 my-3 mt-0 mb-8">
        <div
          key={"All"}
          className={cn(
            "flex cursor-pointer select-none  gap-2 px-6 py-2 bg-white rounded-md shadow-sm text-gray-500 , items-center",
            dishType === "All" && "bg-orange-400 text-white font-medium"
          )}
          onClick={() => setDishType("All")}
        >
          {/* {item.icon} */}
          <p className="text-xs">All</p>
        </div>
        {dishTypes?.map((item) => {
          return (
            <div
              key={item}
              className={cn(
                "flex cursor-pointer select-none  gap-2 px-6 py-2 bg-white rounded-md shadow-sm text-gray-500 , items-center",
                dishType === item && "bg-orange-400 text-white font-medium"
              )}
              onClick={() => setDishType(item)}
            >
              {/* {item.icon} */}
              <p className="text-xs">{item}</p>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-6 mb-12">
        {dishes?.map((item) => {
          return <DishCard dish={item} key={item.name} />;
        })}
      </div>
      <Link href="/dishes/add">
        <div className="fixed flex items-center justify-center text-green-500 cursor-pointer bottom-6 right-6 ">
          <AddSquare iconStyle="Bold" size={60} />
        </div>
      </Link>
      <Sheet
        open={addDishModal}
        onOpenChange={() => setAddDishModal(!addDishModal)}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add a dish</SheetTitle>
            <SheetDescription>
              <AddDishDrawer setAddDishModal={setAddDishModal} />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default Dishes;
