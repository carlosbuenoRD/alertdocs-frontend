import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";

// Reducers
import authReducer from "./reducers/auth";
import areaReducer from "./reducers/area";
import flujosReducer from "./reducers/flujos";
import userReducer from "./reducers/users";
import documentsReducer from "./reducers/documents";
import activityReducer from "./reducers/activity";

// Store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    area: areaReducer,
    flujos: flujosReducer,
    user: userReducer,
    document: documentsReducer,
    activity: activityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
