import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
    try {
        const saved = localStorage.getItem("apple-store-cart");
        return saved ? JSON.parse(saved) : { items: [] };
    } catch {
        return { items: [] };
    }
};

const saveCartToStorage = (items) => {
    try {
        localStorage.setItem("apple-store-cart", JSON.stringify({ items }));
    } catch {}
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) =>
                    item.product.id === newItem.product.id &&
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

            saveCartToStorage(state.items);
        },

        removeFromCart: (state, action) => {
            // Dùng id + variant thay vì index để tránh lỗi khi array thay đổi
            const { productId, selectedColor, selectedStorage } =
                action.payload;
            state.items = state.items.filter(
                (item) =>
                    !(
                        item.product.id === productId &&
                        item.selectedColor === selectedColor &&
                        item.selectedStorage === selectedStorage
                    ),
            );
            saveCartToStorage(state.items);
        },

        updateQuantity: (state, action) => {
            const { productId, selectedColor, selectedStorage, quantity } =
                action.payload;
            const item = state.items.find(
                (item) =>
                    item.product.id === productId &&
                    item.selectedColor === selectedColor &&
                    item.selectedStorage === selectedStorage,
            );
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
            saveCartToStorage(state.items);
        },

        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("apple-store-cart");
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = (state) =>
    state.cart.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
    );

export const selectCartCount = (state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartIsEmpty = (state) => state.cart.items.length === 0;
