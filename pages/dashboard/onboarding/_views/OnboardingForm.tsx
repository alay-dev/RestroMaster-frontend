import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plans } from "@/types/onboarding";
import BasicDetailForm from "./BasicDetailForm";
import { OnboardingContext } from "../../../../context/onboardingContext";
import ContactForm from "./ContactDetail";
import SelectPlan from "./SelectPlan";

export const formChangeVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [cta, setCta] = useState("Book table");
  const [images, setImages] = useState<string[]>([]);
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [currentPlan, setCurrentPlan] = useState<Plans>("Free");

  const values: OnboardingContext = {
    currentStep,
    cta,
    description,
    images,
    restaurantName,
    address,
    contactNo,
    email,
    currentPlan,
    setCta,
    setCurrentStep,
    setDescription,
    setImages,
    setRestaurantName,
    setAddress,
    setContactNo,
    setEmail,
    setCurrentPlan,
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-8 w-full md:w-1/2">
      <div className="flex gap-2 items-center justify-center mb-8 md:mb-16">
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
      <OnboardingContext.Provider value={values}>
        {currentStep === 1 && <BasicDetailForm />}
        {currentStep === 2 && <ContactForm />}
        {currentStep === 3 && <SelectPlan />}
      </OnboardingContext.Provider>
    </div>
  );
};

export default OnboardingForm;
