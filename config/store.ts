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
import { dishApi } from "@/api/dish";
import { utilApi } from "@/api/util";
import { orderApi } from "@/api/order";
import { employeeApi } from "@/api/employee";

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
  [dishApi.reducerPath]: dishApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [employeeApi.reducerPath]: employeeApi.reducer,
  [utilApi.reducerPath]: utilApi.reducer,
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
        .concat(floorApi.middleware)
        .concat(dishApi.middleware)
        .concat(orderApi.middleware)
        .concat(employeeApi.middleware)
        .concat(utilApi.middleware),
  });
}

export const store = setupStore();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
