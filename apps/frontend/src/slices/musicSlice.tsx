import { createSlice } from "@reduxjs/toolkit";

import { Music } from '../types/Music'

const lastMusicList = localStorage.getItem('lastMusicList')
const lastMusic = localStorage.getItem('lastMusic')

export const musicSlice = createSlice({
    name: 'music',
    initialState: {
        musics: Array<Music>(),
        currentMusicList: lastMusicList ? JSON.parse(lastMusicList) : Array<Music>(),
        search: '',
        isPlaying: false,
        currentMusic: lastMusic ?
            JSON.parse(lastMusic)
            :
            {
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
        setCurrentMusicList: (state, action) => {
            state.currentMusicList = action.payload
            if (state.currentMusicList) {
                localStorage.setItem('lastMusicList', JSON.stringify(state.currentMusicList));
            }
        },
        setCurrentMusic: (state, action) => {
            const recentlyPlayed =  localStorage.getItem('recentlyPlayed')? 
                JSON.parse(localStorage.getItem('recentlyPlayed') as string) : Array<Music>()
            state.currentMusic = action.payload
            if (state.currentMusic) {
                localStorage.setItem('lastMusic', JSON.stringify(state.currentMusic));
            }
            console.log(recentlyPlayed)

            if(recentlyPlayed.length === 5) {
                recentlyPlayed.pop()
            }
            if(!recentlyPlayed.filter(
                (music: Music) => { return music.id === action.payload.id }).length) 
            {
                recentlyPlayed.unshift(action.payload)
                localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed))
            }

        },
        handleNext: (state) => {
            const index: number = state.currentMusicList.map((music: Music) => { return music.id }).indexOf(state.currentMusic?.id as number) + 1;
            if (index <= state.currentMusicList.length - 1) {
                state.currentMusic = state.currentMusicList[index]
            } else {
                state.currentMusic = state.currentMusicList[0]
            }
        },
        handlePrevious: (state) => {
            const index: number = state.currentMusicList.map((music: Music) => { return music.id }).indexOf(state.currentMusic?.id as number) - 1;
            console.log(index)
            if (index >= 0) {
                state.currentMusic = state.currentMusicList[index]
            } else {
                state.currentMusic = state.currentMusicList[state.currentMusicList.length - 1]
            }
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        handleIsPlaying: (state, action) => {
            state.isPlaying = action.payload
        }
    },
});

export const { setMusics, setCurrentMusic, setCurrentMusicList, handleNext, handlePrevious, setSearch, handleIsPlaying } = musicSlice.actions;
export default musicSlice.reducer;
