import { Dish } from "@/types/dish";

const DishCard = ({ dish }: DishCardProps) => {
  return (
    <div className="flex-1 flex-shrink-0 p-3 bg-white rounded-lg shadow-sm">
      <div className="w-full mb-3 overflow-hidden rounded-sm h-56">
        <img
          className="object-cover object-center transition duration-200 hover:scale-105"
          src={dish.image?.at(0)}
        />
      </div>
      <h4 className="mb-2 font-medium leading-6">{dish.name}</h4>
      <p className="mb-6 text-xs text-gray-400 line-clamp-3">
        {dish.description}
      </p>
      <h3 className="text-orange-600">
        ₹ <strong className="text-2xl font-semibold ">{dish.price}</strong>
      </h3>
    </div>
  );
};

export default DishCard;

type DishCardProps = {
  dish: Dish;
};