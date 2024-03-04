import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { ChangeEvent } from "react";

const countryCodes = ["91", "00", "50", "77"];

const PhoneInput = ({
  setCountryCode,
  contactNo,
  onChange,
  placeholder,
}: PhoneInputProps) => {
  return (
    <div className="w-full outline-gray-600 border overflow-hidden  rounded-xl flex">
      <Select
        onValueChange={(value) => setCountryCode(value)}
        defaultValue="91"
      >
        <SelectTrigger className="w-20 border-none outline-none  focus:ring-0 flex-shrink-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {countryCodes?.map((item) => (
            <SelectItem key={item} value={item}>
              {" "}
              + {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        {...contactNo}
        type="tel"
        className="ring-none focus:ring-none before:ring-0 pl-0  ring-offset-white border-none focus-visible:ring-none focus-visible:outline-none focus-visible:ring-0 "
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default PhoneInput;

type PhoneInputProps = {
  setCountryCode: (data: string) => void;
  contactNo?: {};
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};
