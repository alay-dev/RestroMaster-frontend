import DashboardLayout from "@/components/layout/DashboardLayout";
import OnboardingForm from "@/pages/dashboard/onboarding/_views/OnboardingForm";
import Preview from "@/pages/dashboard/onboarding/_views/Preview";
import { useRef } from "react";

const Onboarding = () => {
  return (
    <DashboardLayout>
      <div className="flex lg:flex-row flex-col gap-10 items-center mt-5">
        <div className=" w-1/2 hidden md:flex  justify-center">
          <Preview />
        </div>
        <OnboardingForm />
      </div>
    </DashboardLayout>
  );
};

export default Onboarding;
