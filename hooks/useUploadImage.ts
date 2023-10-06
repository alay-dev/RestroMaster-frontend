import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const useUploadImage = (path: string) => {
  const uploadImage = async (file: File) => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    const uploadTask = await uploadBytesResumable(storageRef, file);

    const url = await getDownloadURL(uploadTask.ref);
    return url;
  };

  return uploadImage;
};

export default useUploadImage;
