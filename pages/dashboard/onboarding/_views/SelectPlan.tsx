import { useAddRestaurantMutation } from "@/api/restaurant";
import { useFetchProfileQuery, userApi } from "@/api/users";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/config/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { OnboardingContext } from "../../../../context/onboardingContext";
import { ApiError } from "@/types/api";
import { AnimatePresence, motion } from "framer-motion";
import { formChangeVariants } from "./OnboardingForm";
import PriceCard from "./PriceCard";
import { Button } from "@/components/ui/button";
import {
  AltArrowLeft as ArrowLeft,
  AltArrowRight as ArrowRight,
} from "solar-icon-set";

const SelectPlan = () => {
  const { toast } = useToast();
  const auth = useAppSelector((state) => state.authentication);
  const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);
  const [addRestaurant] = useAddRestaurantMutation();
  const router = useRouter();
  const onboardingContext = useContext(OnboardingContext);

  const dispatch = useAppDispatch();

  const handleSubmitRestaurantDetails = async () => {
    try {
      await addRestaurant({
        user_id: user?.id!,
        name: onboardingContext?.restaurantName || "",
        cover_pic: onboardingContext?.images?.at(0)!,
        description: onboardingContext?.description || "",
        type: "restaurant",
        address: onboardingContext?.address || "",
        email: onboardingContext?.email || "",
        phone_no: onboardingContext?.contactNo || "",
        cta: onboardingContext?.cta || "",
      }).unwrap();

      router.push("/floor-view");
      dispatch(userApi.util.invalidateTags(["me"]));

      toast({
        variant: "default",
        title: "Your restaurant has been created.",
        description: "Lets continue with setting up your floors",
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
            currentPlan={onboardingContext?.currentPlan === "Free"}
            setCurrentPlan={(data) => onboardingContext?.setCurrentPlan(data)}
          />
          <PriceCard
            planName="Pro"
            discount={20}
            price={4999}
            currentPlan={onboardingContext?.currentPlan === "Pro"}
            setCurrentPlan={(data) => onboardingContext?.setCurrentPlan(data)}
          />
          <PriceCard
            planName="Enterprise"
            discount={30}
            price={9999}
            currentPlan={onboardingContext?.currentPlan === "Enterprise"}
            setCurrentPlan={(data) => onboardingContext?.setCurrentPlan(data)}
          />
        </div>
        <div className="flex items-center justify-between mt-8">
          {onboardingContext?.currentStep &&
          onboardingContext?.currentStep > 1 ? (
            <Button
              type="button"
              onClick={() => onboardingContext?.setCurrentStep(2)}
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
            Save
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SelectPlan;
