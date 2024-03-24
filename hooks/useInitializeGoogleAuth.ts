import { google_auth_client_id } from "@/config/oauth";
import { useAppSelector } from "@/config/store";
import { useEffect } from "react";

type Arguments = {
  button: HTMLElement | null;
  onSuccess: (res: string) => void;
  onError: () => void;
};

const useInitializeGoogleAuth = ({ onSuccess, onError, button }: Arguments) => {
  const hasGsiLoaded = useAppSelector(
    (state) => state.authentication.hasGsiLoaded
  );

  useEffect(() => {
    if (!hasGsiLoaded) return;
    window?.google?.accounts?.id?.initialize({
      client_id: google_auth_client_id,
      callback: (res: Google.CredentialResponse) => {
        if (!res.credential) return onError();
        onSuccess(res.credential);
      },
    });
  }, [hasGsiLoaded]);

  useEffect(() => {
    if (!button) return;
    try {
      window.google?.accounts.id.renderButton(button, {
        type: "standard",
        shape: "rectangular",
        theme: "outline",
        width: 500,
      });
    } catch (error) {
      console.log(error);
    }
  }, [button]);

  return null;
};

export default useInitializeGoogleAuth;
