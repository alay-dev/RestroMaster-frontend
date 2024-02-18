import {
  useFetchProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfilePicMutation,
  userApi,
} from "@/api/users";
import PhoneInput from "@/components/common/PhoneInput";
import FormError from "@/components/formError/FormError";
import { Spinner } from "@/components/ui/apinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { userImagePath } from "@/config/firebase";
import { useAppDispatch, useAppSelector } from "@/config/store";
import useUploadImage from "@/hooks/useUploadImage";
import { skipToken } from "@reduxjs/toolkit/query";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Letter, Pen, Pen2 } from "solar-icon-set";

type ProfileDetailInputs = {
  name: string;
  email: string;
  phone_no: string;
  picture: string;
};

const User = () => {
  const auth = useAppSelector((state) => state.authentication);
  const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);
  const [countryCode, setCountryCode] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const uploadImage = useUploadImage(userImagePath);

  const [updateProfile] = useUpdateProfileMutation();
  const [updateProfilePic, { isLoading: updateProfilePicLoading }] =
    useUpdateProfilePicMutation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileDetailInputs>();

  useEffect(() => {
    reset({
      email: user?.email,
      name: user?.name,
      phone_no: user?.phone_no || "",
    });
  }, [user]);

  const updateProfileDetail: SubmitHandler<ProfileDetailInputs> = async (
    data
  ) => {
    if (!user?.id) return;

    try {
      const res = await updateProfile({
        name: data.name,
        phone_no: data.phone_no,
        user_id: user?.id,
      }).unwrap();

      dispatch(userApi.util.invalidateTags(["me"]));
      setUpdateModal(false);

      toast({
        variant: "default",
        title: "profile detail updated.",
      });
    } catch (err) {}
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (!files) return;

    try {
      const url = await uploadImage(files[0]);
      const res = await updateProfilePic({
        profile_pic: url,
      }).unwrap();
      dispatch(userApi.util.invalidateTags(["me"]));
      toast({
        variant: "default",
        title: "Profile picture updated.",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const fallbackAvatar =
  //   user?.name?.split(" ")?.length > 1
  //     ? user?.name?.at(0)?.toUpperCase() +
  //       user?.name?.split(" ")[1]?.at(0)?.toUpperCase()
  //     : user?.name?.at(0)?.toUpperCase();

  return (
    <div className="border-blue-200 bg-card border rounded-xl  mb-8 overflow-hidden">
      <div className="bg-blue-50  p-4 border-b border-blue-200 text-blue-500">
        <p>Profile</p>
      </div>
      <div className=" p-8 flex items-center justify-between  shadow-light">
        <div className="flex items-center gap-8">
          <div className="relative">
            <div className="absolute top-0 right-0 z-10  w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 transition cursor-pointer text-white flex items-center justify-center border border-white ">
              {updateProfilePicLoading ? (
                <Spinner className="w-5 h-5" />
              ) : (
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
              )}
            </div>
            <Avatar className="w-28 h-28 ring-2 ring-offset-2 ring-gray-200">
              <AvatarImage src={user?.picture || ""} alt="@shadcn" />
              {/* <AvatarFallback>{fallbackAvatar}</AvatarFallback> */}
            </Avatar>
          </div>
          <div>
            <h1 className="text-xl mb-1">{user?.name}</h1>

            <h3 className="text-gray-400 text-sm">
              <span>{user?.email}</span>
              <span className="mx-3">&bull;</span>
              <span>{user?.phone_no}</span>
            </h3>
          </div>
        </div>
        <Button
          onClick={() => setUpdateModal(true)}
          variant="outline"
          className="px-10 shadow-sm border-gray-300 gap-4 "
        >
          <Pen />
          Edit
        </Button>
        <Dialog open={updateModal} onOpenChange={(val) => setUpdateModal(val)}>
          <DialogContent className="rounded-lg p-5 outline-none">
            <h2 className="text-xl font-medium mb-4">
              Edit your profile details
            </h2>
            <form onSubmit={handleSubmit(updateProfileDetail)}>
              <label className="text-gray-500 text-sm mb-2" htmlFor="name">
                Name
              </label>
              <Input
                className="outline-gray-600  focus:border-none"
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && <FormError content="Please tell us your name" />}
              <label
                className="text-gray-500 text-sm mb-2 inline-block mt-5"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                className="outline-gray-600  focus:border-none"
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: true })}
              />

              {errors.email && <FormError content="Email is requried" />}
              <label
                className="text-gray-500 text-sm inline-block mt-5"
                htmlFor="contactNo"
              >
                Contact no
              </label>
              <PhoneInput
                setCountryCode={setCountryCode}
                contactNo={register("phone_no", { required: true })}
              />
              {errors.phone_no && (
                <FormError content="Please provide a contact no." />
              )}
              <Button className="mt-5 w-full" type="submit">
                Update
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default User;
