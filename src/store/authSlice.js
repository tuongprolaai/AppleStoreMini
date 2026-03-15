import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    isLoading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.isAuthenticated = true;
            state.isLoading = false;
            localStorage.setItem("accessToken", accessToken);
        },
        setUser: (state, action) => {
            // Dùng khi chỉ cần cập nhật thông tin user, không đổi token
            // Ví dụ: sau khi user sửa profile
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            localStorage.removeItem("accessToken");
        },
    },
});

export const { setCredentials, setUser, setLoading, logout } =
    authSlice.actions;
export default authSlice.reducer;

// Selectors — dùng trực tiếp thay vì viết lại trong component
export const selectCurrentUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => state.auth.user?.role === "admin";
export const selectAuthLoading = (state) => state.auth.isLoading;
