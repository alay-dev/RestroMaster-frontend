import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import { authenticationSlice } from "@/slices/authentication";
import { authenticationApi } from "@/api/authentication";
import { userApi } from "@/api/users";
import { onboardingSlice } from "@/slices/onboarding";
import { restaurantApi } from "@/api/restaurant";
import { floorApi } from "@/api/floor";

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const reducer = combineReducers({
  authentication: authenticationSlice.reducer,
  onboarding: onboardingSlice.reducer,
  [authenticationApi.reducerPath]: authenticationApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [restaurantApi.reducerPath]: restaurantApi.reducer,
  [floorApi.reducerPath]: floorApi.reducer,
});

function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer,
    preloadedState,
    devTools: process.env.NODE_ENV === "production" ? false : true,
    middleware: (middleware) =>
      middleware()
        .concat(userApi.middleware)
        .concat(authenticationApi.middleware)
        .concat(restaurantApi.middleware)
        .concat(floorApi.middleware),
  });
}

export const store = setupStore();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
