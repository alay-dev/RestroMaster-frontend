import {
  useUpdateRestaurantImageMutation,
  useUpdateRestaurantMutation,
} from "@/api/restaurant";
import { useFetchProfileQuery, userApi } from "@/api/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { restaurantImagesPath } from "@/config/firebase";
import { useAppDispatch, useAppSelector } from "@/config/store";
import useUploadImage from "@/hooks/useUploadImage";
import { skipToken } from "@reduxjs/toolkit/query";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type BasicDetailInputs = {
  name: string;
  description: string;
  cta: string;
};

type ContactDetailInputs = {
  address: string;
  contactNo: string;
  email: string;
};

const RestaurantDetail = () => {
  const [updateBasicDetail, setUpdateBasicDetail] = useState(false);
  const [updateAddressContact, setUpdateAddressContact] = useState(false);

  const auth = useAppSelector((state) => state.authentication);
  const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);
  const [updateRestaurant] = useUpdateRestaurantMutation();
  const { uploadImage, isUploading } = useUploadImage(restaurantImagesPath);
  const [updateRestaurantImage] = useUpdateRestaurantImageMutation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const {
    register: basicDetailRegister,
    handleSubmit: basicDetailHandleSubmit,
    formState: { errors: basicDetailErrors },
    reset: basicDetailReset,
  } = useForm<BasicDetailInputs>({});

  const {
    register: addressContactRegister,
    handleSubmit: addressContactHandleSubmit,
    formState: { errors },
    reset: addressContactReset,
  } = useForm<ContactDetailInputs>({});

  useEffect(() => {
    basicDetailReset({
      name: user?.restaurant?.name || "",
      cta: user?.restaurant?.cta || "",
      description: user?.restaurant?.description || "",
    });

    addressContactReset({
      address: user?.restaurant?.address || "",
      contactNo: user?.restaurant?.phone_no || "",
      email: user?.restaurant?.email || "",
    });
  }, [user]);

  const handleBasicDetailUpdate: SubmitHandler<BasicDetailInputs> = async (
    data
  ) => {
    if (
      data.cta === user?.restaurant?.cta &&
      data.description === user?.restaurant?.description &&
      data.name === user?.restaurant.name
    )
      return setUpdateBasicDetail(false);

    try {
      const res = await updateRestaurant({
        restaurant_id: user?.restaurant?.id || "",
        address: user?.restaurant?.address || "",
        cover_pic: user?.restaurant?.cover_pic || "",
        email: user?.restaurant?.email || "",
        phone_no: user?.restaurant?.phone_no || "",
        type: user?.restaurant?.type || "",
        name: data.name,
        cta: data.cta,
        description: data.description,
      }).unwrap();

      dispatch(userApi?.util?.invalidateTags(["me"]));
      setUpdateBasicDetail(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddressContactUpdate: SubmitHandler<ContactDetailInputs> = async (
    data
  ) => {
    if (
      data.address === user?.restaurant?.address &&
      data.contactNo === user?.restaurant?.phone_no &&
      data.email === user?.email
    )
      return setUpdateAddressContact(false);

    try {
      const res = await updateRestaurant({
        restaurant_id: user?.restaurant?.id || "",
        address: data.address,
        cover_pic: user?.restaurant?.cover_pic || "",
        email: data.email,
        phone_no: data.contactNo,
        type: user?.restaurant?.type || "",
        name: user?.restaurant?.name || "",
        cta: user?.restaurant?.cta || "",
        description: user?.restaurant?.description || "",
      }).unwrap();

      dispatch(userApi?.util?.invalidateTags(["me"]));
      setUpdateAddressContact(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (!files || !user?.restaurant?.id) return;

    try {
      const url = await uploadImage(files[0]);
      const res = await updateRestaurantImage({
        cover_pic: url,
        restaurant_id: user?.restaurant?.id,
      }).unwrap();
      dispatch(userApi.util.invalidateTags(["me"]));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" border-blue-200  bg-card border rounded-xl overflow-hidden mb-10 ">
      <div className="bg-blue-50  p-4 py-2 border-b border-blue-200 text-blue-500 text-sm">
        <p>Restaurant</p>
      </div>
      <div className="p-5 md:p-8 flex lg:flex-row flex-col  justify-between  shadow-light gap-12">
        <div className="flex flex-col ">
          <p className="text-gray-500 text-sm mb-3">Restaurant cover image</p>
          <div className="rounded-lg ring-2 ring-offset-2 overflow-hidden mt-3 w-max">
            {user?.restaurant?.cover_pic ? (
              <img
                src={user?.restaurant?.cover_pic || ""}
                alt={user?.restaurant?.name || ""}
                className="w-56 h-56 object-cover"
              />
            ) : (
              <div className="h-64 flex items-center justify-center px-4">
                <p className="text-sm text-gray-400">
                  Restaurant image is not updated yet.
                </p>
              </div>
            )}
          </div>

          <Button variant="link" className="w-max text-blue-500 mt-2  p-0">
            <label htmlFor="restaurantPic">update image</label>
          </Button>

          <input
            className="hidden"
            id="restaurantPic"
            onChange={handleImageUpload}
            type="file"
            accept="image/*"
          />
        </div>
        <div className="flex-1">
          <p className="text-gray-500 text-sm mb-3">Restaurant details</p>
          <form onSubmit={basicDetailHandleSubmit(handleBasicDetailUpdate)}>
            <label
              htmlFor="restaurant-name"
              className="inline-block mt-3 text-sm"
            >
              Name
            </label>
            <Input
              id="restaurant-name"
              {...basicDetailRegister("name", { required: true })}
              disabled={!updateBasicDetail}
            />
            <label
              htmlFor="restaurant-description"
              className="inline-block mt-3 text-sm"
            >
              Description
            </label>
            <Textarea
              id="restaurant-description"
              {...basicDetailRegister("description", { required: true })}
              disabled={!updateBasicDetail}
            />
            <label
              htmlFor="restaurant-cta"
              className="inline-block mt-3 text-sm"
            >
              CTA
            </label>
            <Input
              id="restaurant-cta"
              {...basicDetailRegister("cta", { required: true })}
              disabled={!updateBasicDetail}
            />
            {updateBasicDetail ? (
              <Button
                className="mt-2 text-blue-500 w-max"
                type="submit"
                variant="link"
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setUpdateBasicDetail(true);
                }}
                variant="link"
                className="w-max text-blue-500 mt-2   p-0"
                type="button"
              >
                Update
              </Button>
            )}
          </form>
        </div>
        <div className="flex-1">
          <p className="text-gray-500 text-sm mb-3">
            Restaurant contact & address
          </p>
          <form
            onSubmit={addressContactHandleSubmit(handleAddressContactUpdate)}
          >
            <label
              htmlFor="restaurant-phone"
              className="inline-block mt-3 text-sm"
            >
              Phone
            </label>
            <Input
              id="restaurant-phone"
              {...addressContactRegister("contactNo", { required: true })}
              disabled={!updateAddressContact}
            />
            <label
              htmlFor="restaurant-email"
              className="inline-block mt-3 text-sm"
            >
              Email
            </label>
            <Input
              id="restaurant-email"
              {...addressContactRegister("email", { required: true })}
              disabled={!updateAddressContact}
            />
            <label
              htmlFor="restaurant-address"
              className="inline-block mt-3 text-sm"
            >
              Address
            </label>
            <Textarea
              id="restaurant-address"
              {...addressContactRegister("address", { required: true })}
              disabled={!updateAddressContact}
            />
            {updateAddressContact ? (
              <Button
                className="mt-2 text-blue-500 w-max"
                type="submit"
                variant="link"
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setUpdateAddressContact(true);
                }}
                variant="link"
                className="w-max text-blue-500 mt-2   p-0"
              >
                Update
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
