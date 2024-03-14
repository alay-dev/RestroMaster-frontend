import { PageTitle } from "@/components/PageTitle";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { CloseCircle, RoundedMagnifer } from "solar-icon-set";
import FoodCard from "./_components/FoodCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFetchDishQuery } from "@/api/dish";
import { useAppDispatch, useAppSelector } from "@/config/store";
import { useFetchProfileQuery } from "@/api/users";
import { skipToken } from "@reduxjs/toolkit/query";
import { Category, Dish } from "@/types/dish";
import { formatFloat } from "@/utils/common";
import { OrderItem } from "@/types/order";
import ItemQuantity from "./_components/ItemQuantity";
import { orderApi, useCreateOrderMutation } from "@/api/order";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CustomerDetailModal from "./_components/CustomerDetailModal";

const categories = ["All", "Starter", "Main Course", "Side Dish", "Bevereges"];

const NewOrder = () => {
  const [customerDetailModal, setCustomerDetailModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const auth = useAppSelector((state) => state.authentication);
  const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);
  const { data: dishes } = useFetchDishQuery(user?.restaurant?.id ?? skipToken);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [createOrder] = useCreateOrderMutation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleAddItem = (addItem: Dish) => {
    const itemInOrderList = orderItems?.find((item) => item.id === addItem?.id);
    if (itemInOrderList) return;

    const newList = [...orderItems];

    newList.push({
      ...addItem,
      quantity: 1,
    });

    setOrderItems(newList);
  };

  const handleRemoveItem = (id: string) => {
    const newList = [...orderItems]?.filter((item) => item.id !== id);
    setOrderItems(newList);
  };

  const decreaseQuantity = (item: OrderItem) => {
    if (item.quantity === 1) {
      return handleRemoveItem(item.id);
    }

    const updateItems = orderItems?.map((food) => {
      if (food.id === item.id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      } else {
        return food;
      }
    });

    setOrderItems(updateItems);
  };

  const increaseQuantity = (item: OrderItem) => {
    const updateItems = orderItems?.map((food) => {
      if (food.id === item.id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      } else {
        return food;
      }
    });

    setOrderItems(updateItems);
  };

  let itemTotal = 0;
  orderItems?.map((item) => {
    itemTotal = itemTotal + +item.price * item.quantity;
  });

  const discount = 0.05 * itemTotal;
  const gst = (itemTotal - discount) * 0.18;

  const total = itemTotal + gst - discount;

  const handleConfirmOrder = async () => {
    if (!user?.restaurant?.id) return;

    try {
      await createOrder({
        restaurant_id: user?.restaurant?.id,
        customer_name: customerName,
        customer_phone: customerPhone,
        order_items: orderItems,
        order_total: total,
      }).unwrap();

      dispatch(orderApi.util.invalidateTags(["orders"]));
      toast({
        variant: "default",
        title: "Order created",
      });
      setCustomerDetailModal(false);
    } catch (err) {
      console.log(err);

      toast({
        variant: "destructive",
        title: "Failed to create order",
        description: "Somthing went wrong. Please try again.",
      });
    }
  };
  return (
    <DashboardLayout>
      <PageTitle title="New order" backBtnLink="/orders" />
      <div className="flex gap-8 ">
        <div className="w-4/6">
          <div className="rounded-lg p-4 py-2 vorder bg-card flex gap-1 items-center mb-5">
            <RoundedMagnifer size={25} color="#757575" />
            <Input
              placeholder="Search by name."
              className="focus-visible:outline-none focus-visible:ring-0  border-0 text-md placeholder:text-gray-400"
            />
          </div>
          <ul className="flex items-center gap-5 flex-wrap mb-10">
            {categories?.map((category) => {
              return (
                <li
                  onClick={() => setActiveCategory(category as Category)}
                  key={category}
                  className={cn(
                    "text-sm px-4 py-1 rounded-md border border-orange-500 text-black/50 uppercase cursor-pointer transition",
                    activeCategory === category && "bg-orange-500 text-white"
                  )}
                >
                  {category}
                </li>
              );
            })}
          </ul>
          <ScrollArea className=" h-[30rem]">
            <div className="space-y-3 ">
              {dishes?.map((item) => {
                return (
                  <FoodCard
                    key={item.id}
                    food={item}
                    addItem={handleAddItem}
                    orderItems={orderItems}
                    increaseQuantityHandler={increaseQuantity}
                    decreaseQuantityHandler={decreaseQuantity}
                  />
                );
              })}
            </div>
          </ScrollArea>
        </div>
        <div className="w-2/6 bg-card border rounded-xl p-5 h-max">
          <h3 className=" font-medium mb-4 border-b ">Current Order</h3>
          {orderItems?.length === 0 ? (
            <div className="h-[20rem] flex items-center justify-center">
              <p className="text-sm text-black/50 mb-8">
                No item in order list.
              </p>
            </div>
          ) : null}
          {orderItems?.length ? (
            <ScrollArea className="h-[20rem] mb-4">
              <ul className="">
                {orderItems?.map((item) => {
                  return (
                    <li key={item.id} className="flex gap-4 items-center mb-4">
                      <img
                        className="w-28 aspect-square rounded-sm overflow-hidden"
                        alt=""
                        src={item.image?.at(0)}
                      />
                      <div className="flex justify-between items-center gap-1 w-full">
                        <div>
                          <h4 className="text-black text-sm mb-2">
                            {item?.name}
                          </h4>

                          <ItemQuantity
                            quantity={item.quantity}
                            decreaseHandler={() => decreaseQuantity(item)}
                            increaseHandler={() => increaseQuantity(item)}
                          />
                        </div>
                        <div className="cursor-pointer">
                          <CloseCircle
                            iconStyle="Outline"
                            size={25}
                            color="#e6491995"
                            onClick={() => handleRemoveItem(item.id)}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea>
          ) : null}
          <div className="bg-gray-100 p-2 rounded-md ">
            <div className="flex items-center justify-between text-sm mb-1 ">
              <p className="text-gray-600">Subtotal</p>
              <h4 className="">₹ {itemTotal}</h4>
            </div>
            <div className="flex items-center justify-between text-sm mb-1">
              <p className="text-gray-600">Discount</p>
              <h4 className="">₹ {formatFloat(discount)}</h4>
            </div>
            <div className="flex items-center justify-between text-sm ">
              <p className="text-gray-600">GST (18%)</p>
              <h4 className="">₹ {formatFloat(gst)}</h4>
            </div>
            <div className="flex border-t mt-4 py-2 justify-between items-center">
              <p className="text-lg">Total</p>
              <h4 className="text-lg">₹ {formatFloat(total)}</h4>
            </div>
          </div>

          <Button
            onClick={() => setCustomerDetailModal(true)}
            className="mt-4 w-full"
            disabled={orderItems?.length == 0}
          >
            Continue
          </Button>
          <Dialog
            open={customerDetailModal}
            onOpenChange={() => setCustomerDetailModal(false)}
          >
            <DialogContent className="max-w-max">
              <CustomerDetailModal
                setCustomerPhone={setCustomerPhone}
                setCustomerName={setCustomerName}
                onConfirm={handleConfirmOrder}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewOrder;
