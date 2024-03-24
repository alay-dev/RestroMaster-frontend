"use client";

import {
  useForgotPasswordMutation,
  useLoginWithEmailAndPasswordMutation,
  useLoginWithGoogleMutation,
} from "@/api/authentication";
import FormError from "@/components/formError/FormError";
import { Spinner } from "@/components/ui/apinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useInitializeGoogleAuth from "@/hooks/useInitializeGoogleAuth";
import { ApiError } from "@/types/api";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Eye, EyeClosed, Letter, LockKeyhole } from "solar-icon-set";

type LoginInputs = {
  email: string;
  password: string;
};

export const LoginForm = ({
  setFormType,
}: {
  setFormType: (data: "login" | "signup") => void;
}) => {
  const googleBtnRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginWithEmailAndPassword, { isLoading: loginLoading }] =
    useLoginWithEmailAndPasswordMutation();

  const [loginWithGoogle] = useLoginWithGoogleMutation();
  const [forgotPassword] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginInputs>({
    defaultValues: {
      email: "narualay030@gmail.com",
      password: "user1234",
    },
  });

  const handleLogin: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const auth = await loginWithEmailAndPassword({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (auth.token) router.push("/dashboard");
      toast({ title: "Login successful" });
    } catch (e) {
      const error = e as ApiError;
      toast({
        variant: "destructive",
        title: error.message === "Not found" ? "User not found" : "",
        description:
          error.message === "Not found"
            ? "Please try signup. No user exist with that email."
            : "",
      });
    }
  };

  useInitializeGoogleAuth({
    button: googleBtnRef.current,
    onError: () => {},
    onSuccess: async (token: string) => {
      try {
        const res = await loginWithGoogle(token).unwrap();
        if (res.token) router.push("/dashboard");
        toast({ title: "Login successful" });
      } catch (e) {
        const error = e as ApiError;
        toast({
          variant: "destructive",
          title: error.message === "Not found" ? "User not found" : "",
          description:
            error.message === "Not found"
              ? "Please try signup. No user exist with that email."
              : "",
        });
      }
    },
  });

  return (
    <div className="md:w-[25rem] w-full px-8 md:px-0">
      <h1 className="mb-2 text-3xl font-medium">Welcome !</h1>
      <p className="mb-16 text-sm text-gray-400">
        {" "}
        Start managing your restaurant, better and fater
      </p>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-full relative">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
            ref={googleBtnRef}
          ></div>
          <div className="flex items-center justify-center w-full gap-3 py-3 border rounded-md border-gray-500">
            <img
              className="w-6"
              src="/images/social/google-logo.svg"
              alt="Google logo"
            />
            <h5 className="font-base text-gray-600 text-sm ">
              Continue with google
            </h5>
          </div>
        </div>

        {/* <div className="flex items-center justify-center w-1/2 gap-3 py-2 border rounded-md">
          <img
            className="w-6"
            src="/images/social/facebook-logo.svg"
            alt="Google logo"
          />
          <h5 className="font-base text-gray-600">Facebook</h5>
        </div> */}
      </div>
      <div className="flex items-center justify-center gap-2 my-6">
        <div className="w-48 h-[1px] bg-gray-300" />
        <p className="text-gray-400 ">or</p>
        <div className="w-48 h-[1px] bg-gray-300" />
      </div>
      <form onSubmit={handleSubmit(handleLogin)}>
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
        {errors.email && <FormError content="Email is required" />}
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
        <p
          onClick={() => forgotPassword("alay@zocket.com")}
          className="mb-4 text-sm mt-1 text-right text-blue-600 hover:underline hover:cursor-pointer"
        >
          Forgot password?
        </p>
        <Button type="submit" className="w-full ">
          {!loginLoading ? <p>Login</p> : <Spinner className="w-5" />}
        </Button>
      </form>

      <p className="text-center text-gray-600 text-sm mt-4">
        Don&apos;t have an account?{" "}
        <span
          onClick={() => setFormType("signup")}
          className="font-medium text-blue-600 cursor-pointer hover:underline"
        >
          Sign up
        </span>
      </p>
    </div>
  );
};
