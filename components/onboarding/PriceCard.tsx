import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Plans } from "@/types/onboarding";
import { motion } from "framer-motion";

const PriceCard = ({
  planName,
  discount,
  price,
  currentPlan,
  setCurrentPlan,
}: PriceCardProps) => {
  const handleSetPlan = () => {
    setCurrentPlan(planName);
  };

  return (
    <motion.div
      onClick={handleSetPlan}
      className={cn(
        "rounded-md p-5 shadow-sm flex items-center border cursor-pointer"
      )}
      animate={{
        backgroundColor: currentPlan ? "#22c55e" : "#fff",
        color: currentPlan ? "#fff" : "#000",
      }}
    >
      <Checkbox
        checked={currentPlan}
        className="mr-4 rounded-full w-5 h-5 data-[state=checked]:bg-white data-[state=checked]:text-black border-gray-400"
      />
      <h3>{planName}</h3>
      {planName !== "Free" && (
        <div className="flex ml-auto gap-5 items-center">
          <div className="bg-green-100 text-green-700 p-1 px-2 rounded-lg text-sm">
            save {discount}%
          </div>
          <h3
            className={cn(
              "text-black font-semibold text-lg",
              currentPlan && "text-white"
            )}
          >
            ₹ {price}{" "}
            <span
              className={cn(
                "text-black text-xs font-normal",
                currentPlan && "text-white"
              )}
            >
              /month
            </span>
          </h3>
        </div>
      )}
    </motion.div>
  );
};

export default PriceCard;

type PriceCardProps = {
  planName: Plans;
  discount?: number;
  price?: number;
  currentPlan: boolean;
  setCurrentPlan: (data: "Free" | "Pro" | "Enterprise") => void;
};
