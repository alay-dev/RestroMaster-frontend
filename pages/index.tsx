import { useState } from "react";
import { useAppSelector } from "@/config/store";
import InitialLoading from "@/components/initialLoading/InitialLoading";
import { Permanent_Marker } from "next/font/google";
import { cn } from "@/lib/utils";
import GoogleOauthProvider from "./_components/GoogleOauthProvider";
import LoginForm from "./_views/LoginForm";
import SignupForm from "./_views/SignupForm";

const permanentMarker = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Home() {
  const [formType, setFormType] = useState<"login" | "signup">("login");
  const auth = useAppSelector((state) => state.authentication);

  if (!auth.isInitialized) return <InitialLoading />;

  return (
    <main className={`flex min-h-screen flex-1 `}>
      <div className=" w-2/4 h-[90vh] bg-blue-50 hidden md:flex flex-col items-center justify-around m-8 rounded-xl">
        <div className="flex gap-4 items-center ">
          <h1
            className={cn(
              "text-6xl font-light text-blue-600",
              permanentMarker.className
            )}
          >
            <span>Restro</span>
            <span className="text-2xl text-black/60"> Master</span>
          </h1>
        </div>

        <img src="/images/dashboard/tryPremium.svg" alt="" className="w-3/5" />
        <p className=" text-gray-500 font-light">
          Seamlessly manage your restaurant with presicion and style.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-full md:w-2/4 min-h-screen bg-white">
        <div className="ml-8 mb-5 self-start flex md:hidden">
          <h1
            className={cn(
              "text-4xl font-light text-blue-600   flex ",
              permanentMarker.className
            )}
          >
            <span>Restro</span>
            <span className="text-2xl text-black/60"> Master</span>
          </h1>
        </div>
        <GoogleOauthProvider>
          {formType === "login" && <LoginForm setFormType={setFormType} />}
          {formType === "signup" && <SignupForm setFormType={setFormType} />}
        </GoogleOauthProvider>
      </div>
    </main>
  );
}
