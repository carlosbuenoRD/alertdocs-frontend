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
import historyReducer from "./reducers/history";
import filesReducer from "./reducers/files";
import commentsReducer from "./reducers/comments";
import devolucionReducer from "./reducers/devolucion";
import reportsReducer from "./reducers/reports";
import chatsReducer from "./reducers/chats";

// Store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    area: areaReducer,
    flujos: flujosReducer,
    user: userReducer,
    document: documentsReducer,
    activity: activityReducer,
    history: historyReducer,
    files: filesReducer,
    comments: commentsReducer,
    devolucion: devolucionReducer,
    reports: reportsReducer,
    chat: chatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
