import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { OnboardingContext } from "../_context/onboardingContext";
import { formChangeVariants } from "./OnboardingForm";
import { Textarea } from "@/components/ui/textarea";
import FormError from "@/components/formError/FormError";
import PhoneInput from "@/components/common/PhoneInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AltArrowLeft as ArrowLeft,
  AltArrowRight as ArrowRight,
} from "solar-icon-set";

const ContactForm = () => {
  const onboardingContext = useContext(OnboardingContext);

  const addContactDetails = () => {
    onboardingContext?.setCurrentStep(3);
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

        <form className="mt-9 " onSubmit={addContactDetails}>
          <label className="text-gray-500 text-sm mb-2" htmlFor="address">
            Address
          </label>
          <Textarea
            className="outline-gray-600 focus:border-none"
            id="address"
            onChange={(e) => onboardingContext?.setAddress(e.target.value)}
            value={onboardingContext?.address}
          />
          {onboardingContext?.address === "" && (
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
            onChange={(e) => onboardingContext?.setContactNo(e.target.value)}
          />
          {onboardingContext?.contactNo === "" && (
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
            onChange={(e) => onboardingContext?.setEmail(e.target.value)}
            value={onboardingContext?.email}
          />
          {onboardingContext?.email === "" && (
            <FormError content="Please provide a email" />
          )}
          <div className="flex items-center justify-between mt-8">
            {onboardingContext?.currentStep &&
            onboardingContext?.currentStep > 1 ? (
              <Button
                type="button"
                onClick={() => onboardingContext?.setCurrentStep(1)}
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

export default ContactForm;
