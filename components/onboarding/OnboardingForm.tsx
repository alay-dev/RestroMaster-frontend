import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  AltArrowLeft as ArrowLeft,
  AltArrowRight as ArrowRight,
  GalleryMinimalistic as GalleryIcon,
  AddCircle as AddIcon,
  CloseCircle,
} from "solar-icon-set";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../formError/FormError";
import PhoneInput from "../common/PhoneInput";
import { AnimatePresence, motion } from "framer-motion";
import useUploadImage from "@/hooks/useUploadImage";
import { useAppDispatch, useAppSelector } from "@/config/store";
import {
  setRestaurantAddress,
  setRestaurantContactNo,
  setRestaurantCta,
  setRestaurantDescription,
  setRestaurantEmail,
  setRestaurantImages,
  setRestaurantName,
} from "@/slices/onboarding";
import { restaurantImagesPath } from "@/config/firebase";
import { useFetchProfileQuery, userApi } from "@/api/users";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAddRestaurantMutation } from "@/api/restaurant";
import { ApiError } from "@/types/api";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/router";
import PriceCard from "./PriceCard";
import { Plans } from "@/types/onboarding";
import { Spinner } from "../ui/apinner";

type BasicDetailInputs = {
  name: string;
  description: string;
  cta: string;
  images: File[];
};

type ContactDetailInputs = {
  address: string;
  contactNo: string;
  email: string;
};

const formChangeVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const BasicDetailForm = () => {
    const [images, setImages] = useState<string[]>([]);
    const { uploadImage, isUploading } = useUploadImage(restaurantImagesPath);
    const dispatch = useAppDispatch();

    const {
      watch,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<BasicDetailInputs>({
      defaultValues: {
        cta: "Book table",
      },
    });

    useEffect(() => {
      dispatch(setRestaurantName(watch("name")));
    }, [watch("name")]);

    useEffect(() => {
      dispatch(setRestaurantDescription(watch("description")));
    }, [watch("description")]);

    useEffect(() => {
      dispatch(setRestaurantCta(watch("cta")));
    }, [watch("cta")]);

    useEffect(() => {
      dispatch(setRestaurantImages(images));
    }, [images]);

    const addBasicDetails: SubmitHandler<BasicDetailInputs> = async (
      basicDetail
    ) => {
      setCurrentStep(2);
    };

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target?.files;
      if (!files) return;
      for (let i = 0; i < files.length; i++) {
        const url = await uploadImage(files[i]);
        setImages((images) => [...images, url]);
      }
    };

    return (
      <AnimatePresence>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={formChangeVariants}
        >
          <h2 className="font-medium text-lg">Build your restaurant</h2>
          <p className="text-gray-400 text-sm">
            Get your customer attentions by providing these details
          </p>

          <form className="mt-9 " onSubmit={handleSubmit(addBasicDetails)}>
            <label className="text-gray-500 text-sm mb-2" htmlFor="name">
              Your restaurant name
            </label>
            <Input
              className="outline-gray-600 focus:border-none"
              id="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <FormError content="Please provide your restaurant name" />
            )}
            <label
              className="text-gray-500 text-sm inline-block mt-5"
              htmlFor="description"
            >
              Description
            </label>
            <Textarea
              className="outline-gray-600 focus:border-none"
              id="description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <FormError content="Please provide a description." />
            )}
            <div className="w-full p-4 rounded-xl border-dashed border-2 border-blue-100 mt-5 bg-blue-50 flex gap-5">
              {isUploading && <Spinner />}
              {images.length === 0 && (
                <div className="flex gap-2 items-center">
                  <GalleryIcon size={25} color="#3b82f6" />
                  <label
                    className="text-sm text-blue-500 cursor-pointer"
                    htmlFor="coverImages"
                  >
                    Drop images here or Upload images
                  </label>
                  <input
                    id="coverImages"
                    className="hidden"
                    type="file"
                    multiple
                    accept="image/png, image/webp, image/svg, image/jpg, image/jpeg"
                    {...register("images", { required: true })}
                    onChange={handleImageUpload}
                  />
                </div>
              )}

              {images.length !== 0 && (
                <div className="flex items-center gap-2 flex-wrap ">
                  {images.map((item, i) => (
                    <img
                      key={i}
                      src={item}
                      className="w-16 h-16 rounded-sm object-cover"
                      alt=""
                    />
                  ))}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="ml-2 "
                    onClick={() => setImages([])}
                  >
                    <CloseCircle
                      iconStyle="BoldDuotone"
                      size={30}
                      color="#78909C"
                    />
                  </Button>
                </div>
              )}
            </div>
            {errors.images && <FormError content="Upload atleast one image." />}
            <label
              className="text-gray-500 text-sm inline-block mt-5"
              htmlFor="cta"
            >
              CTA
            </label>
            <Input
              className="outline-gray-600 focus:border-none"
              id="cta"
              {...register("cta", { required: true })}
            />
            {errors.cta && <FormError content="Please provide a cta" />}
            <div className="flex items-center justify-between mt-8">
              {currentStep > 1 ? (
                <Button className="gap-7 rounded-lg">
                  <ArrowLeft iconStyle="Bold" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button type="submit" className="gap-7 rounded-lg">
                Next
                <ArrowRight iconStyle="Bold" />
              </Button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    );
  };

  const ContactForm = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.authentication);
    const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);
    const {
      watch,
      register,
      handleSubmit,
      formState: { errors },
      control,
    } = useForm<ContactDetailInputs>({
      defaultValues: {
        email: user?.email,
        contactNo: user?.phone_no || "",
      },
    });

    useEffect(() => {
      dispatch(setRestaurantAddress(watch("address")));
    }, [watch("address")]);

    useEffect(() => {
      dispatch(setRestaurantEmail(watch("email")));
    }, [watch("email")]);

    useEffect(() => {
      dispatch(setRestaurantContactNo(watch("contactNo")));
    }, [watch("contactNo")]);

    const addContactDetails: SubmitHandler<ContactDetailInputs> = (data) => {
      setCurrentStep(3);
    };

    return (
      <AnimatePresence>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={formChangeVariants}
        >
          <h2 className="font-medium text-lg">Contact details</h2>
          <p className="text-gray-400 text-sm">
            Tell your customers how to reach you
          </p>

          <form className="mt-9 " onSubmit={handleSubmit(addContactDetails)}>
            <label className="text-gray-500 text-sm mb-2" htmlFor="address">
              Address
            </label>
            <Textarea
              className="outline-gray-600 focus:border-none"
              id="address"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <FormError content="Please provide your restaurant address" />
            )}
            <label
              className="text-gray-500 text-sm inline-block mt-5"
              htmlFor="contactNo"
            >
              Contact no
            </label>
            <PhoneInput
              setCountryCode={() => null}
              register={register("contactNo", { required: true })}
            />
            {errors.contactNo && (
              <FormError content="Please provide a contact no." />
            )}
            <label
              className="text-gray-500 text-sm inline-block mt-5"
              htmlFor="email"
            >
              Email
            </label>

            <Input
              type="email"
              className="outline-gray-600 focus:border-none"
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email && <FormError content="Please provide a email" />}
            <div className="flex items-center justify-between mt-8">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="gap-7 rounded-lg"
                >
                  <ArrowLeft iconStyle="Bold" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button type="submit" className="gap-7 rounded-lg">
                Next
                <ArrowRight iconStyle="Bold" />
              </Button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    );
  };

  const SelectPlan = () => {
    const { toast } = useToast();
    const onboarding = useAppSelector((state) => state.onboarding);
    const auth = useAppSelector((state) => state.authentication);
    const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);
    const [addRestaurant] = useAddRestaurantMutation();
    const router = useRouter();
    const [currentPlan, setCurrentPlan] = useState<Plans>("Free");
    const dispatch = useAppDispatch();

    const handleSubmitRestaurantDetails = async () => {
      try {
        await addRestaurant({
          user_id: user?.id!,
          name: onboarding.name,
          cover_pic: onboarding.images?.at(0)!,
          description: onboarding.description,
          type: "restaurant",
          address: onboarding.address,
          email: onboarding.email,
          phone_no: onboarding.contactNo,
          cta: onboarding.cta,
        }).unwrap();

        router.push("/table-view");
        dispatch(userApi.util.invalidateTags(["me"]));

        toast({
          variant: "default",
          title: "Your restaurant has been created.",
        });
      } catch (e) {
        const error = e as ApiError;
        toast({ variant: "destructive", title: error.message });
      }
    };

    return (
      <AnimatePresence>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={formChangeVariants}
        >
          <h2 className="font-medium text-lg">Choose your plan</h2>
          <p className="text-gray-400 text-sm">No contract no surpise fees</p>
          <div className="my-4 space-y-4">
            <PriceCard
              planName="Free"
              currentPlan={currentPlan === "Free"}
              setCurrentPlan={setCurrentPlan}
            />
            <PriceCard
              planName="Pro"
              discount={20}
              price={4999}
              currentPlan={currentPlan === "Pro"}
              setCurrentPlan={setCurrentPlan}
            />
            <PriceCard
              planName="Enterprise"
              discount={30}
              price={9999}
              currentPlan={currentPlan === "Enterprise"}
              setCurrentPlan={setCurrentPlan}
            />
          </div>
          <div className="flex items-center justify-between mt-8">
            {currentStep > 1 ? (
              <Button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="gap-7 rounded-lg"
              >
                <ArrowLeft iconStyle="Bold" />
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={handleSubmitRestaurantDetails}
              className="gap-7 rounded-lg"
            >
              Continue
              <ArrowRight iconStyle="Bold" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="bg-white rounded-xl p-8 w-1/2">
      <div className="flex gap-2 items-center justify-center mb-16">
        <div
          className={cn(
            "h-2 w-16 rounded-sm ",
            currentStep >= 1 ? "bg-blue-500" : "bg-gray-300"
          )}
        ></div>
        <div
          className={cn(
            "h-2 w-16 rounded-sm ",
            currentStep >= 2 ? "bg-blue-500" : "bg-gray-300"
          )}
        ></div>
        <div
          className={cn(
            "h-2 w-16 rounded-sm ",
            currentStep >= 3 ? "bg-blue-500" : "bg-gray-300"
          )}
        ></div>
      </div>
      {currentStep === 1 && <BasicDetailForm />}
      {currentStep === 2 && <ContactForm />}
      {currentStep === 3 && <SelectPlan />}
    </div>
  );
};

export default OnboardingForm;
