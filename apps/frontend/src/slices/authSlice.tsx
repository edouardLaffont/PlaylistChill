import { createSlice } from "@reduxjs/toolkit";
import { Music } from "../types/Music";

const userContext = localStorage.getItem('userContext')

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: userContext ? JSON.parse(userContext).isLoggedIn : false,
        user: userContext ? JSON.parse(userContext).user :
            {
                id: -1,
                username: '',
                tracks: Array<Music>()
            }
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload
            localStorage.setItem('userContext', JSON.stringify({ isLoggedIn: true, user: action.payload }))
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.user = { id: -1, username: '', tracks: [] }
            localStorage.clear()
        },
        setUserTracks: (state, action) => {
            state.user.tracks = action.payload
        }
    }
});

export const { login, logout, setUserTracks } = authSlice.actions;
export default authSlice.reducer;
