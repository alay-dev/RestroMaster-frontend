import { Plans } from "@/types/onboarding";
import { DispatchState } from "@/types/utils";
import { createContext } from "react";

export type OnboardingContext = {
  currentStep: number;
  restaurantName: string;
  description: string;
  cta: string;
  images: string[];
  address: string;
  contactNo: string;
  email: string;
  currentPlan: Plans;
  setRestaurantName: DispatchState<string>;
  setCurrentStep: DispatchState<number>;
  setDescription: DispatchState<string>;
  setCta: DispatchState<string>;
  setImages: DispatchState<string[]>;
  setAddress: DispatchState<string>;
  setContactNo: DispatchState<string>;
  setEmail: DispatchState<string>;
  setCurrentPlan: DispatchState<Plans>;
};

export const OnboardingContext = createContext<OnboardingContext | undefined>(
  undefined
);
