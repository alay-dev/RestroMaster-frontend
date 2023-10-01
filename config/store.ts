import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit";

import { authenticationSlice } from "@/slices/authentication"; 
import { authenticationApi } from "@/api/authentication";

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const reducer = combineReducers({
  authentication : authenticationSlice.reducer,
  [authenticationApi.reducerPath] : authenticationApi.reducer
});

function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer,
    preloadedState,
    devTools: process.env.NODE_ENV === "production" ? false : true,
    middleware: (middleware) => middleware().concat(authenticationApi.middleware)
  });
}

export const store = setupStore();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;