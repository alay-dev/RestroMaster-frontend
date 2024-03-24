import { Dish } from "@/types/dish";

const DishCard = ({ dish }: DishCardProps) => {
  return (
    <div className="flex-1 flex-shrink-0 p-2 bg-white rounded-xl shadow-sm">
      <div className="w-full mb-3 overflow-hidden rounded-sm ">
        <img
          className="object-cover object-center transition duration-200 hover:scale-105 h-44 w-full"
          src={dish?.image?.at(0)}
          alt=""
        />
      </div>
      <h4 className="mb-2 font-medium leading-6">{dish?.name}</h4>
      <p className="mb-2 text-xs text-gray-400 line-clamp-3">
        {dish?.description}
      </p>
      <h3 className="text-orange-600 mt-auto">
        ₹ <strong className="text-2xl font-medium ">{dish?.price}</strong>/-
      </h3>
    </div>
  );
};

export default DishCard;

type DishCardProps = {
  dish: Dish;
};
