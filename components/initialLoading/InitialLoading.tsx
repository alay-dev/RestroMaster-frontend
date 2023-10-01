import { useAppSelector } from "@/config/store";
import { useRouter } from "next/router";

const InitialLoading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <img src="/gif/loading.gif" className="w-44" />
    </div>
  );
};

export default InitialLoading;
