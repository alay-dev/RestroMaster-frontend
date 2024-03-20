import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

const useUploadImage = (path: string) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    const storageRef = ref(storage, `${path}/${file.name}`);
    const uploadTask = await uploadBytesResumable(storageRef, file);

    const url = await getDownloadURL(uploadTask.ref);
    setIsUploading(false);
    return url;
  };

  return { uploadImage, isUploading };
};

export default useUploadImage;
