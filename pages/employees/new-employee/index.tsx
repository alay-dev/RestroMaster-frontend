import { PageTitle } from "@/components/PageTitle";
import PhoneInput from "@/components/common/PhoneInput";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Spinner } from "@/components/ui/apinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employeeImagesPath } from "@/config/firebase";
import useUploadImage from "@/hooks/useUploadImage";
import DatePicker from "@/pages/book-table/_components/DatePicker";
import { DevTool } from "@hookform/devtools";
import React, { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InfoCircle, Pen } from "solar-icon-set";
import { subDays } from "date-fns";
import { employeeApi, useAddEmployeeMutation } from "@/api/employee";
import { useAppDispatch, useAppSelector } from "@/config/store";
import { useFetchProfileQuery } from "@/api/users";
import { skipToken } from "@reduxjs/toolkit/query";
import { ApiError } from "@/types/api";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

const employeeType = [
  {
    title: "Host/Hostess",
    info: "Greets guests, manages reservations, and directs them to their tables.",
  },
  {
    title: "Server/Waiter/Waitress",
    info: "Takes orders, serves food and drinks, and provides excellent customer service.",
  },
  {
    title: "Bartender",
    info: "Prepares and serves alcoholic and non-alcoholic beverages, maintains bar cleanliness, and interacts with customers.",
  },
  {
    title: "Busser/Busboy/Busgirl",
    info: "Clears tables, resets tables, and assists servers with various tasks.",
  },
  {
    title: "Cashier",
    info: "Processes payments, handles cash transactions, and provides receipts to customers.",
  },
  {
    title: "Chef",
    info: "Oversees kitchen operations, plans menus, prepares dishes, and ensures food quality and safety.",
  },
  {
    title: "Cook",
    info: "Prepares and cooks food according to recipes and customer orders.",
  },
  {
    title: "Sous Chef",
    info: "Assists the head chef in managing the kitchen, supervising staff, and coordinating food preparation.",
  },
  {
    title: "Dishwasher",
    info: "Cleans and sanitizes dishes, utensils, and kitchen equipment.",
  },
  {
    title: "Kitchen Porter",
    info: "Assists with kitchen cleanliness, waste disposal, and stocking supplies.",
  },
  {
    title: "Restaurant Manager",
    info: "Oversees overall restaurant operations, including staff management, customer service, and financial performance.",
  },
  {
    title: "Assistant Manager",
    info: "Assists the restaurant manager in daily operations, staff supervision, and administrative tasks.",
  },
  {
    title: "Shift Supervisor",
    info: "Leads shifts, delegates tasks, and ensures smooth operations during specific time periods.",
  },
  {
    title: "Administrative Assistant",
    info: "Handles administrative tasks such as scheduling, inventory management, and office duties.",
  },
  {
    title: "Sommelier",
    info: "Manages wine selection, recommends wine pairings, and assists customers with wine choices.",
  },
  {
    title: "Pastry Chef",
    info: "Creates and prepares desserts, pastries, and baked goods.",
  },
  {
    title: "Barista",
    info: "Prepares and serves specialty coffee drinks, such as espresso, cappuccino, and latte.",
  },
];

type AddEmployeeInputs = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  designation: string;
  dob: Date;
};

const NewEmployee = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [photo, setPhoto] = useState("");
  const uploadImage = useUploadImage(employeeImagesPath);
  const [addEmployee] = useAddEmployeeMutation();

  const auth = useAppSelector((state) => state.authentication);
  const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<AddEmployeeInputs>({
    defaultValues: {},
  });

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (!files) return;

    const url = await uploadImage(files[0]);
    setPhoto(url);
  };

  const handleAddEmployee: SubmitHandler<AddEmployeeInputs> = async (data) => {
    if (!user?.restaurant?.id) return;
    try {
      await addEmployee({
        date_of_birth: data.dob,
        designation: data.designation,
        email: data.email,
        phone: data.phone,
        first_name: data.firstName,
        last_name: data.lastName,
        photo: photo,
        restaurant_id: user?.restaurant?.id,
      }).unwrap();

      toast({ title: "New employee added" });
      dispatch(employeeApi.util.invalidateTags(["employee"]));
      router.push("/employees");
    } catch (e) {
      const error = e as ApiError;
      toast({ variant: "destructive", title: error.message });
    }
  };

  return (
    <DashboardLayout>
      <PageTitle backBtnLink="/employees" title="Add Employee" />
      <div className=" gap-7 my-3 mb-8 p-8 rounded-xl bg-white">
        <form onSubmit={handleSubmit(handleAddEmployee)}>
          <div className=" flex gap-8  w-full">
            <div className="w-2/5 flex items-center justify-center">
              <div className="relative w-max">
                <div className="absolute top-1 right-1 z-10  w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 transition cursor-pointer text-white flex items-center justify-center border border-white ">
                  <>
                    <label
                      htmlFor="profile-pic"
                      className="inline-block p-0 m-0 "
                    >
                      <Pen />
                    </label>
                    <input
                      id="profile-pic"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </>
                </div>
                <Avatar className="w-36 h-36 ring-2 ring-offset-2 ring-gray-200">
                  <AvatarImage src={photo} alt="" />
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="w-3/5">
              <h4 className="text-lg font-medium mb-5">Basic details</h4>

              <div className="grid grid-cols-2 gap-8">
                <Input
                  placeholder="First name"
                  {...register("firstName", { required: true })}
                />
                <Input
                  placeholder="Last name"
                  {...register("lastName", { required: true })}
                />
              </div>

              <div className="grid grid-cols-2 gap-8 mt-5">
                <PhoneInput
                  setCountryCode={() => null}
                  placeholder="Phone no."
                  register={register("phone", { required: true })}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="grid grid-cols-2 gap-8 mt-5">
                {/* <DatePicker
                  placeholder="Date of birth"
                  date={dob}
                  onChange={(date) => setDob(date)}
                /> */}
                <Input type="date" {...register("dob", { required: true })} />
                <Select onValueChange={(val) => setValue("designation", val)}>
                  <SelectTrigger
                    {...register("designation", { required: true })}
                  >
                    <SelectValue placeholder="Employee type" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[20rem]">
                    {employeeType?.map((employee) => {
                      return (
                        <SelectItem
                          key={employee?.title}
                          value={employee.title}
                        >
                          <p className="w-max">{employee.title}</p>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-7">
            <Button type="submit">Add Employee</Button>
          </div>
          <DevTool control={control} />
        </form>
      </div>
    </DashboardLayout>
  );
};

export default NewEmployee;
