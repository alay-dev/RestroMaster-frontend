import { dishApi, useAddDishMutation } from "@/api/dish";
import { useFetchProfileQuery } from "@/api/users";
import { useFetchPhotosMutation } from "@/api/util";
import FormError from "@/components/formError/FormError";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { dishImagesPath } from "@/config/firebase";
import { useAppSelector } from "@/config/store";
import useUploadImage from "@/hooks/useUploadImage";
import { ApiError } from "@/types/api";
import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useDispatch } from "react-redux";
import {
  Gallery as UploadIcon,
  RoundedMagnifer as SearchIcon,
  AltArrowLeft as BackIcon,
  CloseCircle as CloseIcon,
} from "solar-icon-set";
import { PageTitle } from "@/components/PageTitle";

type AddDishInputs = {
  name: string;
  description: string;
  price: string;
  category: string;
  images: File[];
};

const AddDish = () => {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const [images, setImages] = useState<string[]>([]);
  const uploadImage = useUploadImage(dishImagesPath);

  const [addDish, { isLoading }] = useAddDishMutation();
  const auth = useAppSelector((state) => state.authentication);
  const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);
  const [fetchPhotos, { data: photos }] = useFetchPhotosMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddDishInputs>({
    defaultValues: {
      category: "starter",
    },
  });

  const handleFetchphotos = async (keyboard: string) => {
    if (keyboard.length < 3) return;
    await fetchPhotos(keyboard);
  };

  const handleAddDish: SubmitHandler<AddDishInputs> = async (dishDetail) => {
    if (images.length === 0) {
      return toast({
        variant: "default",
        title: "Please provide atleast one image",
      });
    }
    try {
      await addDish({
        category: dishDetail.category,
        description: dishDetail.description,
        images: images,
        name: dishDetail.name,
        price: dishDetail.price,
        restaurant_id: user?.restaurant?.id!,
      });
      toast({ title: "Dish added" });
      dispatch(dishApi.util.invalidateTags(["dish"]));
      router.push("/dishes");
    } catch (e) {
      const error = e as ApiError;
      toast({ variant: "destructive", title: error.message });
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImage(files[i]);
      setImages((images) => [...images, url]);
    }
  };

  const handleDeleteImage = (img: string) => {
    let _images = images.filter((item) => item !== img);

    setImages([..._images]);
  };

  const handleAddPhoto = (img: string) => {
    const _images = Array.from(new Set([...images, img]));
    setImages([..._images]);
  };

  return (
    <DashboardLayout>
      <PageTitle backBtnLink="/dishes" title="Add dish" />

      <form onSubmit={handleSubmit(handleAddDish)}>
        {/* <DevTool control={control} /> */}
        <div className="flex   gap-7 my-3 mb-8 p-8 rounded-xl bg-white">
          <div className=" w-1/2 ">
            <Label className="text-gray-500 " htmlFor="dishName">
              Dish name
            </Label>
            <Input
              id="dishName"
              className="mb-3"
              {...register("name", { required: true })}
            />
            {errors.name && <FormError content="Please provide a dish name" />}
            <Label className="text-gray-500" htmlFor="description">
              Description
            </Label>
            <Textarea
              id="description"
              rows={7}
              className="mb-3"
              {...register("description", { required: true })}
            />
            {errors.name && (
              <FormError content="Please provide a dish description" />
            )}
            <Label className="text-gray-500" htmlFor="price">
              Price
            </Label>
            <Input
              id="price"
              className="mb-3"
              {...register("price", { required: true })}
            />
            {errors.name && <FormError content="Please provide dish price" />}
            <Label className="text-gray-500" htmlFor="category">
              Category
            </Label>
            <Select
              {...register("category", { required: true })}
              defaultValue="starter"
            >
              <SelectTrigger id="category" className="">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="mainCourse">Main course</SelectItem>
                <SelectItem value="desert">Desert</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="mt-8 w-56">
              Save
            </Button>
          </div>
          <div className="w-1/2  h-full">
            <div className="flex gap-2 flex-wrap w-full mb-5 ">
              {images.length !== 0 &&
                images.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="relative w-24 h-24 ring-1 ring-gray-300 rounded-lg ring-offset-2"
                    >
                      <CloseIcon
                        iconStyle="BoldDuotone"
                        color="#616161"
                        size={20}
                        className="absolute top-1 right-1 cursor-pointer"
                        onClick={() => handleDeleteImage(item)}
                      />

                      <img
                        src={item}
                        className="w-full h-full rounded-sm object-cover"
                        alt=""
                      />
                    </div>
                  );
                })}
            </div>

            <div className=" border-2 border-dashed  border-blue-300 bg-blue-50  rounded-xl h-max mb-auto">
              <label htmlFor="images" className="p-6 flex gap-4 items-center">
                <UploadIcon iconStyle="BoldDuotone" size={35} color="#1565C0" />
                <div>
                  <p className="text-blue-500">Upload images of the dish</p>
                </div>
              </label>
              <input
                id="images"
                type="file"
                multiple
                className="hidden"
                accept="image/png, image/webp, image/svg, image/jpg, image/jpeg"
                onChange={handleImageUpload}
              />
            </div>
            <div className="flex items-center justify-between w-full my-8 gap-3 text-gray-500">
              <div className="w-1/2 h-px bg-gray-300" />
              Or
              <div className="w-1/2 h-px bg-gray-300" />
            </div>
            <div className="flex gap-2 items-center border rounded-lg p-2 ">
              <SearchIcon size={25} color="#757575" />
              <Input
                type="search"
                placeholder="Search stock library"
                className="outline-none border-none focus-visible:ring-0  ring-0"
                onChange={(e) => handleFetchphotos(e.target.value)}
              />
            </div>
            <div className="flex gap-3 flex-wrap mt-4">
              {photos?.length === 0 && <p>No images found</p>}
              {photos?.length !== 0 &&
                photos?.map((item, i) => {
                  return (
                    <img
                      key={i}
                      onClick={() => handleAddPhoto(item.img)}
                      src={item.img}
                      className="w-24 h-24 rounded-sm object-cover"
                      alt=""
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default AddDish;
