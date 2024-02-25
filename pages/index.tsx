import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Letter,
  LockKeyhole,
  Eye,
  EyeClosed,
  User,
  ChefHat,
} from "solar-icon-set";
import googleLogo from "@/public/images/social/google-logo.svg";
import facebookLogo from "@/public/images/social/facebook-logo.svg";
import { useEffect, useState } from "react";
import {
  useLoginWithEmailAndPasswordMutation,
  useSignupMutation,
} from "@/api/authentication";
import { useAppSelector } from "@/config/store";
import { useRouter } from "next/router";
import InitialLoading from "@/components/initialLoading/InitialLoading";
import { Spinner } from "@/components/ui/apinner";
import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormError from "@/components/formError/FormError";
import { useToast } from "@/components/ui/use-toast";
import { ApiError } from "@/types/api";

type SignupInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginInputs = {
  email: string;
  password: string;
};

export default function Home() {
  const router = useRouter();

  const [formType, setFormtype] = useState<"login" | "signup">("login");

  const auth = useAppSelector((state) => state.authentication);

  const LoginForm = () => {
    const { toast } = useToast();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginWithEmailAndPassword, { isLoading: loginLoading }] =
      useLoginWithEmailAndPasswordMutation();

    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
    } = useForm<LoginInputs>();

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
        toast({ variant: "destructive", title: error.message });
      }
    };

    return (
      <div className="w-[25rem]">
        <h1 className="mb-2 text-3xl font-medium">Welcome !</h1>
        <p className="mb-16 text-sm text-gray-400">
          {" "}
          Start managing your restaurant, better and fater
        </p>
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
          <p className="mb-4 text-right text-blue-600 hover:underline hover:cursor-pointer">
            Forgot password?
          </p>
          <Button type="submit" className="w-full ">
            {!loginLoading ? <p>Login</p> : <Spinner className="w-5" />}
          </Button>
        </form>
        <div className="flex items-center justify-center gap-2 my-6">
          <div className="w-48 h-[1px] bg-gray-300" />
          <p className="text-gray-400 ">or</p>
          <div className="w-48 h-[1px] bg-gray-300" />
        </div>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-1/2 gap-3 py-2 border rounded-md">
            <img className="w-6" src={googleLogo.src} alt="Google logo" />
            <h5 className="font-base text-gray-600">Google</h5>
          </div>
          <div className="flex items-center justify-center w-1/2 gap-3 py-2 border rounded-md">
            <img className="w-6" src={facebookLogo.src} alt="Google logo" />
            <h5 className="font-base text-gray-600">Facebook</h5>
          </div>
        </div>
        <p className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setFormtype("signup")}
            className="font-medium text-blue-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
        <DevTool control={control} />
      </div>
    );
  };

  const SignupForm = () => {
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
        setFormtype("login");
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
              type={passwordVisible ? "text" : "password"}
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
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => setFormtype("login")}
            className="font-medium text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
        <DevTool control={control} />
      </div>
    );
  };

  if (!auth.isInitialized) return <InitialLoading />;

  return (
    <main className={`flex min-h-screen flex-1 `}>
      <div className="w-2/4 min-h-screen bg-gray-100 flex flex-col items-center justify-around">
        <div className="flex gap-4 items-center ">
          <h1 className="text-2xl">Restro Master</h1>
        </div>

        <img src="/images/login.png" alt="" className="w-3/4" />
        <p className=" text-gray-500 font-thin">
          Seamlessly manage your restaurant with presicion and style.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-2/4 min-h-screen bg-white">
        {formType === "login" && <LoginForm />}
        {formType === "signup" && <SignupForm />}
      </div>
    </main>
  );
}
