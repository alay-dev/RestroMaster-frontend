import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPkq0ApnL5d0_hf3n5Yy_oKn_q7dDzooE",
  authDomain: "restromanger.firebaseapp.com",
  projectId: "restromanger",
  storageBucket: "restromanger.appspot.com",
  messagingSenderId: "345773741279",
  appId: "1:345773741279:web:ff7d9ce023b99000dc856a",
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const restaurantImagesPath = "restaurants";
export const userImagePath = "user";
export const dishImagesPath = "dishes";
export const employeeImagesPath = "employees";
