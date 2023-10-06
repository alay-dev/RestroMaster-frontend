import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type OnboardingProps = {
  name: string;
  description: string;
  images: string[];
  cta: string;
  address: string;
  contactNo: string;
  email: string;
};

const initialState: OnboardingProps = {
  name: "",
  description: "",
  images: [],
  cta: "",
  address: "",
  contactNo: "",
  email: "",
};

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setRestaurantName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setRestaurantDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setRestaurantImages: (state, action: PayloadAction<string[]>) => {
      state.images = action.payload;
    },
    setRestaurantCta: (state, action: PayloadAction<string>) => {
      state.cta = action.payload;
    },
    setRestaurantAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setRestaurantContactNo: (state, action: PayloadAction<string>) => {
      state.contactNo = action.payload;
    },
    setRestaurantEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const {
  setRestaurantAddress,
  setRestaurantCta,
  setRestaurantDescription,
  setRestaurantEmail,
  setRestaurantImages,
  setRestaurantName,
  setRestaurantContactNo,
} = onboardingSlice.actions;
