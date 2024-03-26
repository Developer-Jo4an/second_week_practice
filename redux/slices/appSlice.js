import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'
import { AppController } from '@/js/controllers/AppController'
import { AppRequestHandler } from '@/js/requestHandlers/AppRequestHandler'
import { APP_USER_ADD, LOCAL_STORAGE } from '@/js/constants/appSliceConst'

const createAsyncSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

const initialState = {
    isLoading: false,
    error: null,
    users: [],
    usersInLocalStorage: JSON.parse(localStorage.getItem('users') || '[]'),
    usersInSessionStorage: JSON.parse(sessionStorage.getItem('users') || '[]')
}


export const appSlice = createAsyncSlice({
    name: 'appSlice',
    initialState,
    selectors: {
        selectAppFull: sliceState => sliceState,
        selectAppRequest: sliceState => ({
            isLoading: sliceState.isLoading,
            error: sliceState.error,
            users: sliceState.users
        }),
        selectAppIsLoading: sliceState => sliceState.isLoading,
        selectAppError: sliceState => sliceState.error,
        selectAppUsers: sliceState => sliceState.users,
        selectAppUsersInLS: sliceState => sliceState.usersInLocalStorage,
        selectAppUsersInSS: sliceState => sliceState.usersInSessionStorage,
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
        ),
        setAppUsersToStorage: create.reducer((state, action) => {
            const { user, actionValue, storage } = action.payload

            const currentStorage = `usersIn${ storage }Storage`

            const usersArr = actionValue === APP_USER_ADD ?
                state[currentStorage] = [...state[currentStorage], user]
                :
                state[currentStorage] = state[currentStorage].filter(customer => customer.id !== user.id)

            storage === LOCAL_STORAGE ?
                localStorage.setItem('users', JSON.stringify(usersArr))
                :
                sessionStorage.setItem('users', JSON.stringify(usersArr))
        }),
    })
})

export const {
    selectAppFull,
    selectAppRequest,
    selectAppIsLoading,
    selectAppError,
    selectAppUsers,
    selectAppUsersInLS,
    selectAppUsersInSS
} = appSlice.selectors

export const {
    setAppIsLoading,
    setAppError,
    setAppUsersAsync,
    setAppUsersToStorage
} = appSlice.actions