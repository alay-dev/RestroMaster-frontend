import { useFetchRestaurantQuery } from "@/api/restaurant";
import { useRouter } from "next/router";
import {
  StarsMinimalistic,
  MapPoint as AddressIcon,
  Letter as EmailIcon,
  Phone as PhoneIcon,
} from "solar-icon-set";

const Restaurant = ({ setStep }: RestaurantProps) => {
  const router = useRouter();
  const restaurant_id = router.query.restaurant_id as string;
  const restaurant = useFetchRestaurantQuery(restaurant_id, {
    skip: !restaurant_id,
  });

  if (restaurant?.isLoading) return null;

  return (
    <div className="w-full h-screen bg-white  overflow-hidden relative">
      <div className="relative">
        <img
          src={restaurant?.data?.cover_pic || "/images/mock/restaurant1.jpg"}
          className="h-[14rem] object-cover w-full"
          alt=""
        />
        <div className="absolute bottom-0  h-24 bg-gradient-to-t  from-white to-white/10  left-0 w-full "></div>
      </div>
      <div className="absolute flex gap-3 items-center justify-between w-full top-[12rem] p-4 h-max">
        <h2 className="font-medium">
          {restaurant?.data?.name || "Your restaurant name"}
        </h2>
        <div className="rounded-lg bg-green-500 text-white px-4 py-2 text-xs flex gap-1 items-center">
          <StarsMinimalistic iconStyle="Bold" />
          --
        </div>
      </div>
      <div className="text-sm line-clamp-4 text-gray-500 px-4 mt-12">
        {restaurant?.data?.description || "your restaurant description"}
      </div>
      <ul className="px-4 mt-9">
        <li className="flex items-center gap-3 mb-3">
          <AddressIcon size={20} />
          <p className="text-xs text-gray-400">
            {restaurant?.data?.address || "ABC street, ABC"}
          </p>
        </li>
        <li className="flex items-center gap-3 mb-3">
          <EmailIcon size={15} />
          <p className="text-xs text-gray-400">
            {restaurant?.data?.email || "your@email.com"}
          </p>
        </li>
        <li className="flex items-center gap-3">
          <PhoneIcon size={15} />
          <p className="text-xs text-gray-400">
            +91 {restaurant?.data?.phone_no || "0000000000"}
          </p>
        </li>
      </ul>
      <div
        role="button"
        onClick={setStep}
        className="absolute bottom-0 bg-blue-500 w-full h-11 text-white flex items-center justify-center"
      >
        {restaurant?.data?.cta || "Book table"}
      </div>
    </div>
  );
};

export default Restaurant;

export type RestaurantProps = {
  setStep: () => void;
};
