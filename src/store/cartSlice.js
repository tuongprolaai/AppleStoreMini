import { createSlice } from "@reduxjs/toolkit";

// Không cần load từ localStorage nữa, redux-persist sẽ tự lo việc đó!
const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const newId = newItem.product._id || newItem.product.id;

            const existingItem = state.items.find(
                (item) =>
                    (item.product._id || item.product.id) === newId &&
                    item.selectedColor === newItem.selectedColor &&
                    item.selectedStorage === newItem.selectedStorage,
            );

            if (existingItem) {
                existingItem.quantity += newItem.quantity ?? 1;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: newItem.quantity ?? 1,
                });
            }
        },

        removeFromCart: (state, action) => {
            const { productId, selectedColor, selectedStorage } =
                action.payload;

            state.items = state.items.filter(
                (item) =>
                    !(
                        (item.product._id || item.product.id) === productId &&
                        item.selectedColor === selectedColor &&
                        item.selectedStorage === selectedStorage
                    ),
            );
        },

        updateQuantity: (state, action) => {
            const { productId, selectedColor, selectedStorage, quantity } =
                action.payload;

            const item = state.items.find(
                (item) =>
                    (item.product._id || item.product.id) === productId &&
                    item.selectedColor === selectedColor &&
                    item.selectedStorage === selectedStorage,
            );

            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },

        clearCart: (state) => {
            state.items = [];
            // Không cần removeItem localStorage ở đây, dispatch clearCart thì redux-persist tự update.
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;

// ── Selectors ─────────────────────────────────────────
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = (state) =>
    state.cart.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
    );

export const selectCartCount = (state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartIsEmpty = (state) => state.cart.items.length === 0;
