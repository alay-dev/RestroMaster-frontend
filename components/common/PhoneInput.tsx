import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

const countryCodes = ["91", "00", "50", "77"];

const PhoneInput = ({
  setCountryCode,
  contactNo,
  onChange,
  placeholder,
  register,
}: PhoneInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        "w-full outline-gray-600 border overflow-hidden  rounded-lg flex ",
        isFocused && " ring-2 ring-offset-2 ring-offset-background border-input"
      )}
    >
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
        onChange={onChange}
        {...register}
        // {...contactNo}
        type="tel"
        className="ring-none focus:ring-none before:ring-0 pl-0  ring-offset-white border-none focus-visible:ring-none focus-visible:outline-none focus-visible:ring-0 w-full"
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
  register?: UseFormRegisterReturn;
};
