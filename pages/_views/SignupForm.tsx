import { useSignupMutation } from "@/api/authentication";
import FormError from "@/components/formError/FormError";
import { Spinner } from "@/components/ui/apinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ApiError } from "@/types/api";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Eye, EyeClosed, Letter, LockKeyhole, User } from "solar-icon-set";

type SignupInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignupForm = ({
  setFormType,
}: {
  setFormType: (val: "login" | "signup") => void;
}) => {
  const { toast } = useToast();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signup, { isLoading: signupLoading }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    control,
  } = useForm<SignupInputs>();

  const handleSignup: SubmitHandler<SignupInputs> = async (data) => {
    try {
      await signup({
        email: data.email,
        password: data.password,
        name: data.name,
      }).unwrap();
      setFormType("login");
      toast({
        title: "Signup successful",
      });
    } catch (e) {
      const error = e as ApiError;
      toast({ variant: "destructive", title: error.message });
    }
  };

  return (
    <div className="w-[25rem]">
      <h1 className="mb-2 text-3xl font-medium">Sign up</h1>
      <p className="mb-16 text-sm text-gray-400">
        {" "}
        Start managing your restaurant, better and fater
      </p>
      <form onSubmit={handleSubmit(handleSignup)} className="">
        <div className="flex items-center gap-1 p-2 mt-3 bg-gray-100 rounded-lg ">
          <div className="flex items-center justify-center bg-white rounded-sm h-9 w-11">
            <User size={20} color="#1E88E5" />
          </div>
          <Input
            className="bg-gray-100 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent ring-0"
            type="text"
            placeholder="your name"
            {...register("name", { required: true })}
          />
        </div>
        {errors.name && <FormError content="Please tell us your name" />}
        <div className="flex items-center gap-1 p-2 mt-3 bg-gray-100 rounded-lg ">
          <div className="flex items-center justify-center bg-white rounded-sm h-9 w-11">
            <Letter size={20} color="#1E88E5" />
          </div>
          <Input
            className="bg-gray-100 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent ring-0"
            type="email"
            placeholder="you@example.com"
            {...register("email", { required: true })}
          />
        </div>
        {errors.email && <FormError content="Email is requried" />}
        <div className="flex items-center gap-1 p-2 mt-3 bg-gray-100 rounded-lg">
          <div className="flex items-center justify-center bg-white rounded-sm h-9 w-11">
            <LockKeyhole size={20} color="#1E88E5" />
          </div>
          <Input
            className="bg-gray-100 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent ring-0"
            type={passwordVisible ? "text" : "password"}
            placeholder="********"
            {...register("password", { required: true })}
          />
          {passwordVisible ? (
            <Button
              onClick={() => setPasswordVisible(false)}
              type="button"
              variant="ghost"
              size="icon"
            >
              <EyeClosed />
            </Button>
          ) : (
            <Button
              onClick={() => setPasswordVisible(true)}
              type="button"
              variant="ghost"
              size="icon"
            >
              <Eye />
            </Button>
          )}
        </div>
        {errors.password && <FormError content="Password is required" />}
        <div className="flex items-center gap-1 p-2 mt-3 bg-gray-100 rounded-lg">
          <div className="flex items-center justify-center bg-white rounded-sm h-9 w-11">
            <LockKeyhole size={20} color="#1E88E5" />
          </div>
          <Input
            className="bg-gray-100 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent ring-0"
            type={"password"}
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: true,
              validate: () =>
                getValues("password") === getValues("confirmPassword"),
            })}
          />
        </div>
        {errors.confirmPassword &&
        errors.confirmPassword.type === "validate" ? (
          <FormError content="Confirm password doesn't match with password" />
        ) : errors.confirmPassword?.type === "required" ? (
          <FormError content="Confirm password is required" />
        ) : null}

        <Button type="submit" className="w-full my-6 ">
          {!signupLoading ? <p>Signup</p> : <Spinner className="w-5" />}
        </Button>
      </form>
      <p className="text-center text-gray-600 text-sm">
        Already have an account?{" "}
        <span
          onClick={() => setFormType("login")}
          className="font-medium text-blue-600 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
};
