import { createSlice } from "@reduxjs/toolkit";

import { Music } from '../types/Music'

export const musicSlice = createSlice({
    name: 'music',
    initialState: {
        musics: Array<Music>()
    },
    reducers: {
        getMusics: (state, action) => {
            state.musics = action.payload
        },
    },
});

export const { getMusics } = musicSlice.actions;
export default musicSlice.reducer;