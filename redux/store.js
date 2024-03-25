import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appSlice } from '@/redux/slices/appSlice'

const rootReducer = combineReducers({
    [appSlice.name] : appSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer
})