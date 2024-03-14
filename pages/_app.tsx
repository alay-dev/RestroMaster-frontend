import "@/styles/globals.css";
import { AppProps } from "next/app";
import { store } from "@/config/store";
import { Provider } from "react-redux";
import { Fragment, useEffect } from "react";

import {
  authenticateUser,
  reauthenticateUser,
  setAuthToken,
} from "@/slices/authentication";
import { useRouter } from "next/router";
import { authKey } from "@/constants/storage";
import { Toaster } from "@/components/ui/toaster";
import { Poppins } from "next/font/google";
import { unauthorizedPaths } from "@/constants/auth";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname;

  console.log(pathname, "PATHNAME");

  useEffect(() => {
    const authToken = sessionStorage.getItem(authKey);
    let loading: ReturnType<typeof setTimeout>;

    if (!authToken && !unauthorizedPaths.includes(pathname)) {
      loading = setTimeout(() => {
        router.push("/").then(() => {
          store.dispatch(reauthenticateUser());
        });
      }, 2000);
    } else {
      loading = setTimeout(() => {
        if (router.pathname === "/") {
          router.push("/dashboard").then(() => {
            store.dispatch(authenticateUser());
            store.dispatch(setAuthToken(authToken));
          });
        } else {
          store.dispatch(authenticateUser());
          store.dispatch(setAuthToken(authToken));
        }
      }, 2000);
    }

    return () => {
      clearInterval(loading);
    };
  }, []);

  return (
    <div className={poppins.className}>
      <Head>
        <title>Restro master</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
        <Toaster />
      </Provider>
    </div>
  );
}
