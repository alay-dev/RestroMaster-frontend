import PhoneInput from "@/components/common/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CustomerDetailModal = ({
  setCustomerPhone,
  setCustomerName,
  onConfirm,
}: CustomerDetailProps) => {
  return (
    <div className="md:w-[30rem] rounded-lg ">
      <Label className="mb-1">Customer name</Label>
      <Input
        placeholder="Customer name"
        className=" mb-3"
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <Label className="mb-1">Customer Phone no.</Label>
      <PhoneInput
        setCountryCode={() => null}
        onChange={(e) => setCustomerPhone(e.target.value)}
        placeholder="Customer phone"
      />
      <Button onClick={onConfirm} className="w-full mt-5">
        Confirm order
      </Button>
    </div>
  );
};

export default CustomerDetailModal;

type CustomerDetailProps = {
  onConfirm: () => void;
  setCustomerPhone: (val: string) => void;
  setCustomerName: (val: string) => void;
};
