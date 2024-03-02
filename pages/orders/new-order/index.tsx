import { PageTitle } from "@/components/PageTitle";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CloseCircle, RoundedMagnifer } from "solar-icon-set";

const NewOrder = () => {
  return (
    <DashboardLayout>
      <PageTitle title="New order" />
      <div className="flex gap-8 ">
        <div className="w-4/6">
          <div className="rounded-lg p-4 py-2 vorder bg-card flex gap-1 items-center">
            <RoundedMagnifer size={25} color="#757575" />
            <Input
              placeholder="Search by name."
              className="focus-visible:outline-none focus-visible:ring-0 border-0 text-md"
            />
          </div>
        </div>
        <div className="w-2/6 bg-card border rounded-xl p-5">
          <h3 className=" font-medium mb-4 border-b">Current Order</h3>
          <ul className="mb-4">
            <li className="flex gap-4 items-center mb-4">
              <img className="w-28 aspect-square rounded-sm overflow-hidden" />
              <div className="flex justify-between items-center gap-1 w-full">
                <div>
                  <h4 className="text-black text-sm mb-2">
                    Special spicy fried rice
                  </h4>
                  <div className="rounded-lg px-1 py-px flex items-center gap-1   w-max text-sm">
                    <div className="w-5  flex items-center justify-center">
                      -
                    </div>
                    <div className="flex items-center justify-center  w-7 h-7 rounded-full bg-gray-200">
                      1
                    </div>
                    <div className="w-5flex items-center justify-center">+</div>
                  </div>
                </div>
                <CloseCircle
                  iconStyle="BoldDuotone"
                  size={30}
                  color="#e6491995"
                />
              </div>
            </li>
            <li className="flex gap-4 items-center">
              <img className="w-28 aspect-square rounded-sm overflow-hidden" />
              <div className="flex justify-between items-center gap-1 w-full">
                <div>
                  <h4 className="text-black text-sm mb-2 ">
                    Special spicy fried rice
                  </h4>
                  <div className="rounded-lg px-1 py-px flex items-center gap-1   w-max text-sm">
                    <div className="w-5  flex items-center justify-center">
                      -
                    </div>
                    <div className="flex items-center justify-center  w-7 h-7 rounded-full bg-gray-200">
                      1
                    </div>
                    <div className="w-5flex items-center justify-center">+</div>
                  </div>
                </div>
                <CloseCircle
                  iconStyle="BoldDuotone"
                  size={30}
                  color="#e6491995"
                />
              </div>
            </li>
          </ul>
          <div className="bg-gray-100 p-2 rounded-md ">
            <div className="flex items-center justify-between text-xs">
              <p className="text-gray-700">Subtotal</p>
              <h4 className="text-lg">₹ 51.4</h4>
            </div>
            <div className="flex items-center justify-between text-xs">
              <p className="text-gray-700">Discount</p>
              <h4 className="text-lg">₹ 51.4</h4>
            </div>
            <div className="flex items-center justify-between text-xs">
              <p className="text-gray-700">GST (18%)</p>
              <h4 className="text-lg">₹ 10.2</h4>
            </div>
            <div className="flex border-t mt-4 py-2 justify-between items-center">
              <p className="text-lg">Total</p>
              <h4 className="text-lg">₹ 10.2</h4>
            </div>
          </div>
          <Button className="mt-4 w-full">Confirm order</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewOrder;
