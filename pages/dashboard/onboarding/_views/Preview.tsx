import { useAppSelector } from "@/config/store";
import {
  StarsMinimalistic,
  MapPoint as AddressIcon,
  Letter as EmailIcon,
  Phone as PhoneIcon,
} from "solar-icon-set";

const Preview = () => {
  const onboarding = useAppSelector((state) => state.onboarding);
  return (
    <div className="w-[22rem] h-[35rem] bg-white rounded-md overflow-hidden relative">
      <div className="relative">
        <img
          src={onboarding.images?.at(0) || "/images/mock/restaurant1.jpg"}
          className="h-[14rem] object-cover w-full"
        />
        <div className="absolute bottom-0  h-24 bg-gradient-to-t  from-white to-white/10  left-0 w-full "></div>
      </div>
      <div className="absolute flex gap-3 items-center justify-between w-full top-[12rem] p-4 h-max">
        <h2 className="font-medium">
          {onboarding.name || "Your restaurant name"}
        </h2>
        <div className="rounded-lg bg-green-500 text-white px-4 py-2 text-xs flex gap-1 items-center">
          <StarsMinimalistic iconStyle="Bold" />
          --
        </div>
      </div>
      <div className="text-sm line-clamp-4 text-gray-500 px-4 mt-12">
        {onboarding.description || "your restaurant description"}
      </div>
      <ul className="px-4 mt-9">
        <li className="flex items-center gap-3 mb-3">
          <AddressIcon size={20} />
          <p className="text-xs text-gray-400">
            {onboarding.address || "ABC street, ABC"}
          </p>
        </li>
        <li className="flex items-center gap-3 mb-3">
          <EmailIcon size={15} />
          <p className="text-xs text-gray-400">
            {onboarding.email || "your@email.com"}
          </p>
        </li>
        <li className="flex items-center gap-3">
          <PhoneIcon size={15} />
          <p className="text-xs text-gray-400">
            +91 {onboarding.contactNo || "0000000000"}
          </p>
        </li>
      </ul>
      <div className="absolute bottom-0 bg-blue-500 w-full h-11 text-white flex items-center justify-center">
        {onboarding.cta || "Book table"}
      </div>
    </div>
  );
};

export default Preview;
