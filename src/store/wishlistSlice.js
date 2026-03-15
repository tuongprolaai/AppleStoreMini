import { createSlice } from "@reduxjs/toolkit";

const loadWishlistFromStorage = () => {
    try {
        const saved = localStorage.getItem("apple-store-wishlist");
        return saved ? JSON.parse(saved) : { items: [] };
    } catch {
        return { items: [] };
    }
};

const saveWishlistToStorage = (items) => {
    try {
        localStorage.setItem("apple-store-wishlist", JSON.stringify({ items }));
    } catch {}
};

const initialState = loadWishlistFromStorage();

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const product = action.payload;
            const exists = state.items.find((item) => item.id === product.id);
            if (!exists) {
                state.items.push(product);
                saveWishlistToStorage(state.items);
            }
        },

        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.id !== productId);
            saveWishlistToStorage(state.items);
        },

        toggleWishlist: (state, action) => {
            const product = action.payload;
            const index = state.items.findIndex(
                (item) => item.id === product.id,
            );
            if (index !== -1) {
                state.items.splice(index, 1);
            } else {
                state.items.push(product);
            }
            saveWishlistToStorage(state.items);
        },

        clearWishlist: (state) => {
            state.items = [];
            localStorage.removeItem("apple-store-wishlist");
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectWishlistIsEmpty = (state) =>
    state.wishlist.items.length === 0;
export const selectIsInWishlist = (productId) => (state) =>
    state.wishlist.items.some((item) => item.id === productId);
