import { authenticationApi } from "@/api/authentication";
import { authKey } from "@/constants/storage";
import { User } from "@/types/user";
import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";

export type AuthenticationState = {
  user: User | null;
  isInitialized: boolean;
  token: null | string;
};

const initialState: AuthenticationState = {
  user: null,
  isInitialized: false,
  token: null,
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
    reauthenticateUser: (state) => {
      sessionStorage.removeItem(authKey);
      return { ...initialState, isInitialized: true };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authenticationApi.endpoints.loginWithEmailAndPassword.matchFulfilled,
      (state, action) => {
        console.log(action.payload, "STORE");
        sessionStorage.setItem(authKey, action.payload.token);
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
  },
});

export const { authenticateUser, reauthenticateUser, setAuthToken } =
  authenticationSlice.actions;
