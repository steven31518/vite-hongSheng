import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "@/slice/loginSlice";
import productsReducer from "@/slice/productsSlice";
import adminActionReducer from "./slice/adminActionSlice";
import onSalesReducer from "./slice/onSalesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    loginData: loginReducer,
    productsData: productsReducer,
    adminActionData: adminActionReducer,
    onSalesData: onSalesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Export a hook that can be reused to resolve types
export default store;
