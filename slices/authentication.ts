import { authenticationApi } from "@/api/authentication";
import { authKey } from "@/constants/storage";
import { User } from "@/types/user";
import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";

export type AuthenticationState = {
  user: User | null;
  isInitialized: boolean;
  token: null | string;
  hasGsiLoaded: boolean;
};

const initialState: AuthenticationState = {
  user: null,
  isInitialized: false,
  token: null,
  hasGsiLoaded: false,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isInitialized = true;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    setGsiLoaded: (state, action) => {
      state.hasGsiLoaded = action.payload;
    },
    reauthenticateUser: (state) => {
      sessionStorage.removeItem(authKey);
      return { ...initialState, isInitialized: true };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authenticationApi.endpoints.loginWithEmailAndPassword.matchFulfilled,
      (state, action) => {
        sessionStorage.setItem(authKey, action.payload.token);
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
    builder.addMatcher(
      authenticationApi.endpoints.loginWithGoogle.matchFulfilled,
      (state, action) => {
        sessionStorage.setItem(authKey, action.payload.token);
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
  },
});

export const {
  authenticateUser,
  reauthenticateUser,
  setAuthToken,
  setGsiLoaded,
} = authenticationSlice.actions;
