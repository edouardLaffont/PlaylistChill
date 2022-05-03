import { createSlice } from "@reduxjs/toolkit";
import { Music } from "../types/Music";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: {
            id: -1,
            username: '',
            tracks: Array<Music>()
        }
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.user = { id: -1, username: '', tracks: [] }
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
