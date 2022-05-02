import { createSlice } from "@reduxjs/toolkit";

import { Music } from '../types/Music'
import { getNewTrack } from '../data/musicApi'

export const musicSlice = createSlice({
    name: 'music',
    initialState: {
        musics: Array<Music>(),
        currentMusic: {
            id: 0,
            title: "",
            artist: "",
            link: ""
        }
    },
    reducers: {
        setMusics: (state, action) => {
            state.musics = action.payload
        },
        setCurrentMusic: (state, action) => {
            state.currentMusic = action.payload
            if (state.currentMusic) {
                localStorage.setItem('lastMusic', state.currentMusic.id.toString());
            }

        },
        handleNext: (state) => {
            getNewTrack().then((data) => {
                console.log(data);
                dispatch(state.currentMusic = data[0])
            })
        },
        handlePrevious: (state) => {
            const index: number = state.musics.map((music: Music) => { return music.link }).indexOf(state.currentMusic?.link as string) - 1;
            if (index <= state.musics.length - 1) {
                state.currentMusic = state.musics[index]
            } else {
                state.currentMusic = state.musics[0]
            }
        }
    },
});

export const { setMusics, setCurrentMusic, handleNext, handlePrevious } = musicSlice.actions;
export default musicSlice.reducer;

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
