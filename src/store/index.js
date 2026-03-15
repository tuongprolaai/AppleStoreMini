import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import uiReducer from "./uiSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

// Export để dùng trong useSelector và useDispatch
export const useAppSelector = (selector) => selector(store.getState());
