import { setGsiLoaded } from "@/slices/authentication";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

const GoogleOauthProvider = ({ children }: { children?: ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");

    script.id = "gsi-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.defer = true;
    script.onload = () => {
      dispatch(setGsiLoaded(true));
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return children;
};

export default GoogleOauthProvider;
