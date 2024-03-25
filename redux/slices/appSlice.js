import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'
import { AppController } from '@/js/controllers/AppController'
import { AppRequestHandler } from '@/js/requestHandlers/AppRequestHandler'

const createAsyncSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

const initialState = {
    isLoading: false,
    error: null,
    users: []
}

export const appSlice = createAsyncSlice({
    name: 'appSlice',
    initialState,
    selectors: {
        selectAppFull: sliceState => sliceState,
        selectAppIsLoading: sliceState => sliceState.isLoading,
        selectAppError: sliceState => sliceState.error,
        selectAppUsers: sliceState => sliceState.users
    },
    reducers: create => ({
        setAppIsLoading: create.reducer((state, action) => {
            state.isLoading = action.payload
        }),
        setAppError: create.reducer((state, action) => {
            state.error = state.action.payload
        }),
        setAppUsersAsync: create.asyncThunk(
            AppController.getUsers,
            AppRequestHandler.getUsers
        )
    })
})

export const {
    selectAppFull,
    selectAppIsLoading,
    selectAppError,
    selectAppUsers
} = appSlice.selectors

export const {
    setAppIsLoading,
    setAppError,
    setAppUsersAsync
} = appSlice.actions