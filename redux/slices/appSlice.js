import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'
import { AppController } from '@/js/controllers/AppController'
import { AppRequestHandler } from '@/js/requestHandlers/AppRequestHandler'

const createAsyncSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

export const APP_USER_DEL = 'remove'
export const APP_USER_ADD = 'add'

const initialState = {
    isLoading: false,
    error: null,
    users: [],
	usersInLocalStorage: [],
	usersInSessionStorage: []
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
	    setAppUserLocal: create.reducer((state, action) => {
			const { actionType, userId } = action.payload

		    switch (actionType) {
			    case APP_USER_DEL : {
				    return state.usersInLocalStorage = state.usersInLocalStorage.filter(({ id }) => id !== userId)
			    }
			    case APP_USER_ADD : {
					const currentUser = state.users.find(({ id }) => id === userId)
					return state.usersInLocalStorage.push(currentUser)
			    }
		    }
	    })
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
    setAppUsersAsync
} = appSlice.actions