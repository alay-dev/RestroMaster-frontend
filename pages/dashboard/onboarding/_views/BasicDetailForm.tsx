import { restaurantImagesPath } from "@/config/firebase";
import useUploadImage from "@/hooks/useUploadImage";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, useContext } from "react";
import FormError from "@/components/formError/FormError";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/apinner";

import {
  AltArrowLeft as ArrowLeft,
  AltArrowRight as ArrowRight,
  GalleryMinimalistic as GalleryIcon,
  CloseCircle,
} from "solar-icon-set";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OnboardingContext } from "../../../../context/onboardingContext";
import { formChangeVariants } from "./OnboardingForm";

const BasicDetailForm = () => {
  const { uploadImage, isUploading } = useUploadImage(restaurantImagesPath);
  const onboardingContext = useContext(OnboardingContext);

  const addBasicDetails = async () => {
    onboardingContext?.setCurrentStep(2);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImage(files[i]);
      onboardingContext?.setImages((images) => [...images, url]);
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

        <form className="mt-9 " onSubmit={addBasicDetails}>
          <label className="text-gray-500 text-sm mb-2" htmlFor="name">
            Your restaurant name
          </label>
          <Input
            className="outline-gray-600 focus:border-none"
            id="name"
            value={onboardingContext?.restaurantName}
            onChange={(e) =>
              onboardingContext?.setRestaurantName(e.target.value)
            }
          />
          {onboardingContext?.restaurantName === "" && (
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
            onChange={(e) => onboardingContext?.setDescription(e.target.value)}
            value={onboardingContext?.description}
          />
          {onboardingContext?.description === "" && (
            <FormError content="Please provide a description." />
          )}
          <div className="w-full p-4 rounded-xl border-dashed border-2 border-blue-100 mt-5 bg-blue-50 flex gap-5">
            {isUploading && <Spinner />}
            {onboardingContext?.images.length === 0 && (
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
                  onChange={handleImageUpload}
                />
              </div>
            )}

            {onboardingContext?.images.length !== 0 && (
              <div className="flex items-center gap-2 flex-wrap ">
                {onboardingContext?.images.map((item, i) => (
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
                  onClick={() => onboardingContext?.setImages([])}
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
          {onboardingContext?.images?.length === 0 && (
            <FormError content="Upload atleast one image." />
          )}
          <label
            className="text-gray-500 text-sm inline-block mt-5"
            htmlFor="cta"
          >
            CTA
          </label>
          <Input
            className="outline-gray-600 focus:border-none"
            id="cta"
            value={onboardingContext?.cta}
            onChange={(e) => onboardingContext?.setCta(e.target.value)}
          />
          {!onboardingContext?.cta && (
            <FormError content="Please provide a cta" />
          )}
          <div className="flex items-center justify-between mt-8">
            {onboardingContext?.currentStep &&
            onboardingContext?.currentStep > 1 ? (
              <Button className="gap-7 rounded-lg">
                <ArrowLeft iconStyle="Bold" />
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button
              disabled={isUploading}
              type="submit"
              className="gap-7 rounded-lg"
            >
              Next
              <ArrowRight iconStyle="Bold" />
            </Button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default BasicDetailForm;
