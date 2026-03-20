import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const product = action.payload;
            const targetId = product._id || product.id;
            const exists = state.items.find(
                (item) => (item._id || item.id) === targetId,
            );
            if (!exists) {
                state.items.push(product);
            }
        },

        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(
                (item) => (item._id || item.id) !== productId,
            );
        },

        toggleWishlist: (state, action) => {
            const product = action.payload;
            const targetId = product._id || product.id;
            const index = state.items.findIndex(
                (item) => (item._id || item.id) === targetId,
            );
            if (index !== -1) {
                state.items.splice(index, 1);
            } else {
                state.items.push(product);
            }
        },

        clearWishlist: (state) => {
            state.items = [];
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

// ── Selectors ─────────────────────────────────────────
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectWishlistIsEmpty = (state) =>
    state.wishlist.items.length === 0;

// ✅ Dùng createSelector để memoize, tránh tạo function mới mỗi render
export const selectIsInWishlist = (productId) =>
    createSelector(selectWishlistItems, (items) =>
        items.some((item) => (item._id || item.id) === productId),
    );
