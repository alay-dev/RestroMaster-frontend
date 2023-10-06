import DashboardLayout from "@/components/layout/DashboardLayout";
import OnboardingForm from "@/components/onboarding/OnboardingForm";
import Preview from "@/components/onboarding/Preview";
import { useRef } from "react";

const Onboarding = () => {
  return (
    <DashboardLayout>
      <div className="flex gap-10 items-center mt-5">
        <div className="w-1/2 flex  justify-center">
          <Preview />
        </div>
        <OnboardingForm />
      </div>
    </DashboardLayout>
  );
};

export default Onboarding;
