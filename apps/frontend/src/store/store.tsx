import { configureStore } from '@reduxjs/toolkit'
import music from '../slices/musicSlice'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'

const store =  configureStore({
    reducer: {
        music: music,
    },
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store