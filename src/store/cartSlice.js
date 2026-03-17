import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const getProductId = (product) => product?._id || product?.id;

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const newId = getProductId(newItem.product);

            const existingItem = state.items.find(
                (item) =>
                    getProductId(item.product) === newId &&
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
                        getProductId(item.product) === productId &&
                        item.selectedColor === selectedColor &&
                        item.selectedStorage === selectedStorage
                    ),
            );
        },

        updateQuantity: (state, action) => {
            const { productId, selectedColor, selectedStorage, quantity } =
                action.payload;

            // Nếu quantity <= 0 thì xóa item
            if (quantity <= 0) {
                state.items = state.items.filter(
                    (item) =>
                        !(
                            getProductId(item.product) === productId &&
                            item.selectedColor === selectedColor &&
                            item.selectedStorage === selectedStorage
                        ),
                );
                return;
            }

            const item = state.items.find(
                (item) =>
                    getProductId(item.product) === productId &&
                    item.selectedColor === selectedColor &&
                    item.selectedStorage === selectedStorage,
            );

            if (item) {
                item.quantity = quantity;
            }
        },

        clearCart: (state) => {
            state.items = [];
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
        (total, item) => total + (item.product?.price ?? 0) * item.quantity,
        0,
    );

export const selectCartCount = (state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartIsEmpty = (state) => state.cart.items.length === 0;
