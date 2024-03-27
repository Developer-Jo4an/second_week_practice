import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'
import { AppController } from '@/js/controllers/AppController'
import { AppRequestHandler } from '@/js/requestHandlers/AppRequestHandler'
import { APP_USER_ADD, LOCAL_STORAGE } from '@/js/constants/appSliceActStor'
import { USER_PATH } from '@/js/constants/serverUrl'

const createAsyncSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

const initialState = {
    getUsers: { isLoading: false, error: null },
    postUser: { isLoading: false, error: null },
    users: [],
    usersInLocalStorage: JSON.parse(localStorage.getItem(USER_PATH) || '[]'),
    usersInSessionStorage: JSON.parse(sessionStorage.getItem(USER_PATH) || '[]')
}

export const appSlice = createAsyncSlice({
    name: 'appSlice',
    initialState,
    selectors: {
        selectAppGetUsers: sliceState => ({
            isLoading: sliceState.getUsers.isLoading,
            error: sliceState.getUsers.error,
            users: sliceState.users,
            usersInLocal: sliceState.usersInLocalStorage,
            usersInSession: sliceState.usersInSessionStorage
        }),
        selectAppPostUser: sliceState => sliceState.postUser,
        selectAppUsersInLS: sliceState => sliceState.usersInLocalStorage,
        selectAppUsersInSS: sliceState => sliceState.usersInSessionStorage,
    },
    reducers: create => ({
        setAppUsersAsync: create.asyncThunk(
            AppController.getUsers,
            AppRequestHandler.getUsers
        ),
        setAppUserAsync: create.asyncThunk(
            AppController.postUser,
            AppRequestHandler.postUser
        ),
        setAppUsersToStorage: create.reducer((state, action) => {
            const { user, actionValue, storage } = action.payload

            const currentStorage = `usersIn${ storage }Storage`

            const usersArr = actionValue === APP_USER_ADD ?
                state[currentStorage] = [...state[currentStorage], user]
                :
                state[currentStorage] = state[currentStorage].filter(customer => customer.id !== user.id)

            const truthStorage = storage === LOCAL_STORAGE ? localStorage : sessionStorage

            truthStorage.setItem(USER_PATH, JSON.stringify(usersArr))
        }),
        setDeleteUserEverywhere: create.reducer((state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload)

            const inLocal = state.usersInLocalStorage.some(user => user.id === action.payload)
            const inSession = state.usersInSessionStorage.some(user => user.id === action.payload)

            if (inLocal) {
                state.usersInLocalStorage = state.usersInLocalStorage.filter(user => user.id !== action.payload)
                localStorage.setItem(USER_PATH, JSON.stringify(state.usersInLocalStorage))
            }
            if (inSession) {
                state.usersInSessionStorage = state.usersInSessionStorage.filter(user => user.id !== action.payload)
                sessionStorage.setItem(USER_PATH, JSON.stringify(state.usersInLocalStorage))
            }
        })
    })
})

export const {
    selectAppGetUsers,
    selectAppPostUser,
    selectAppUsersInLS,
    selectAppUsersInSS
} = appSlice.selectors

export const {
    setAppUsersAsync,
    setAppUserAsync,
    setAppUsersToStorage,
    setDeleteUserEverywhere
} = appSlice.actions