import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'
import { AppController } from '@/js/controllers/AppController'
import { AppRequestHandler } from '@/js/requestHandlers/AppRequestHandler'
import { APP_USER_ADD, LOCAL_STORAGE } from '@/js/constants/appSliceActStor'
import { USER_PATH } from '@/js/constants/serverUrl'

const createAsyncSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

const initialState = {
    getUsers: { isLoading: false, error: null },
    postUser: { isLoading: false, error: null },
	deleteUser: { isLoading: false, error: null },
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
	    selectAppDeleteUser: sliceState => sliceState.deleteUser,
        selectAppUsersInLS: sliceState => sliceState.usersInLocalStorage,
        selectAppUsersInSS: sliceState => sliceState.usersInSessionStorage,
    },
    reducers: create => ({
        setAppGetUsersAsync: create.asyncThunk(
            AppController.getUsers,
            AppRequestHandler.getUsers
        ),
	    setAppGetUsersZeroingError: create.reducer((state, action) => {
			state.getUsers.error = null
	    }),
        setAppPostUserAsync: create.asyncThunk(
            AppController.postUser,
            AppRequestHandler.postUser
        ),
	    setAppPostUserZeroingError: create.reducer((state, action) => {
		    state.postUser.error = null
	    }),
	    setAppDeleteUserAsync: create.asyncThunk(
		    AppController.deleteUser,
		    AppRequestHandler.deleteUser
	    ),
	    setAppDeleteUserZeroingError: create.reducer((state, action) => {
		    state.deleteUser.error = null
	    }),
	    setAppZeroingStorage: create.reducer((state, action) => {
			const storage = action.payload === LOCAL_STORAGE ? localStorage : sessionStorage
		    const currentStorageKey = `usersIn${ action.payload }`

		    storage.removeItem(USER_PATH)
		    state[currentStorageKey] = []
	    }),
        setAppUsersToStorage: create.reducer((state, action) => {
            const { user, actionValue, storage } = action.payload

            const currentStorageKey = `usersIn${ storage }`

            const usersArr = actionValue === APP_USER_ADD ?
                state[currentStorageKey] = [...state[currentStorageKey], user]
                :
                state[currentStorageKey] = state[currentStorageKey].filter(customer => customer.id !== user.id)

            const truthStorage = storage === LOCAL_STORAGE ? localStorage : sessionStorage

            truthStorage.setItem(USER_PATH, JSON.stringify(usersArr))
        }),
    })
})

export const {
    selectAppGetUsers,
    selectAppPostUser,
	selectAppDeleteUser,
    selectAppUsersInLS,
    selectAppUsersInSS
} = appSlice.selectors

export const {
	setAppGetUsersAsync,
	setAppGetUsersZeroingError,
    setAppPostUserAsync,
	setAppPostUserZeroingError,
	setAppZeroingStorage,
	setAppDeleteUserAsync,
	setAppDeleteUserZeroingError,
    setAppUsersToStorage,
} = appSlice.actions