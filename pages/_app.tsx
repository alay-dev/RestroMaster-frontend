import "@/styles/globals.css";
import { AppProps } from "next/app";
import { store } from "@/config/store";
import { Provider } from "react-redux";
import { useEffect } from "react";

import {
  authenticateUser,
  reauthenticateUser,
  setAuthToken,
} from "@/slices/authentication";
import { useRouter } from "next/router";
import { authKey } from "@/constants/storage";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem(authKey);
    let loading: ReturnType<typeof setTimeout>;

    if (!authToken) {
      loading = setTimeout(() => {
        router.push("/").then(() => {
          store.dispatch(reauthenticateUser());
        });
      }, 2000);
    } else {
      loading = setTimeout(() => {
        router.push("/dashboard").then(() => {
          store.dispatch(authenticateUser());
          store.dispatch(setAuthToken(authToken));
        });
      }, 2000);
    }

    return () => {
      clearInterval(loading);
    };
  }, []);

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
        <Toaster />
      </Provider>
    </>
  );
}
