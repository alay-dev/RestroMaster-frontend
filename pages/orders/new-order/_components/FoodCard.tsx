import { Button } from "@/components/ui/button";
import { Dish } from "@/types/dish";
import { OrderItem } from "@/types/order";
import ItemQuantity from "./ItemQuantity";

const FoodCard = ({
  food,
  addItem,
  orderItems,
  increaseQuantityHandler,
  decreaseQuantityHandler,
}: FoodCardProps) => {
  let isAlreadyAdded = false;

  const _food = orderItems?.find((item) => item.id === food.id);
  if (_food) isAlreadyAdded = true;
  else isAlreadyAdded = false;

  const orderItem = isAlreadyAdded
    ? orderItems?.find((item) => item.id === food.id)
    : null;

  return (
    <div className="w-full bg-card border p-2 md:p-4 rounded-xl flex gap-3 md:gap-6 hover:shadow-light transition">
      <img
        src={food?.image?.at(0)}
        alt=""
        className="w-28 aspect-square rounded-md"
      />
      <div className="flex gap-5 md:gap-16 items-center justify-between w-full">
        <div className="h-full flex-1">
          <h3 className="mb-1 md:mb-2">{food?.name}</h3>
          <p className="text-xs text-gray-400 line-clamp-2 ">
            {food?.description}
          </p>
          <h4 className="mt-4 text-lg text-orange-500">
            <span className="text-xs">₹ </span>
            {food?.price}
          </h4>
        </div>
        {isAlreadyAdded && orderItem ? (
          <ItemQuantity
            quantity={orderItem?.quantity}
            decreaseHandler={() => decreaseQuantityHandler(orderItem)}
            increaseHandler={() => increaseQuantityHandler(orderItem)}
          />
        ) : (
          <Button onClick={() => addItem(food)} className="text-xs w-max">
            Add item
          </Button>
        )}
      </div>
    </div>
  );
};

export default FoodCard;

type FoodCardProps = {
  food: Dish;
  orderItems: OrderItem[];
  addItem: (item: Dish) => void;
  increaseQuantityHandler: (item: OrderItem) => void;
  decreaseQuantityHandler: (item: OrderItem) => void;
};
