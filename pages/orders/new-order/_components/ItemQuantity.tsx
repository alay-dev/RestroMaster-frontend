import { OrderItem } from "@/types/order";
import { AddSquare, MinusSquare } from "solar-icon-set";

const ItemQuantity = ({
  quantity,
  increaseHandler,
  decreaseHandler,
}: ItemQuantityProps) => {
  const formatedQuantity = quantity < 10 ? `0${quantity}` : quantity;

  return (
    <div className="flex gap-1 items-center bg-orange  rounded-lg border text-sm select-none w-max">
      <MinusSquare
        className="cursor-pointer"
        iconStyle="Bold"
        color="#FFCC80"
        size={25}
        onClick={decreaseHandler}
      />
      <div className="w-6 text-center">{formatedQuantity}</div>
      <AddSquare
        className="cursor-pointer"
        onClick={increaseHandler}
        iconStyle="Bold"
        color="#1976D2"
        size={25}
      />
    </div>
  );
};

export default ItemQuantity;

type ItemQuantityProps = {
  quantity: number;
  increaseHandler: () => void;
  decreaseHandler: () => void;
};
