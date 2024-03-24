import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2e1bWG1IjAOPg_K_HQeZlQSSv_33n_Ow",
  authDomain: "restromaster.firebaseapp.com",
  projectId: "restromaster",
  storageBucket: "restromaster.appspot.com",
  messagingSenderId: "742602802841",
  appId: "1:742602802841:web:4f6f5700bee07ef87c5a08",
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const restaurantImagesPath = "restaurants";
export const userImagePath = "user";
export const dishImagesPath = "dishes";
export const employeeImagesPath = "employees";
