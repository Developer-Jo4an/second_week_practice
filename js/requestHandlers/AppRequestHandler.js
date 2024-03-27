import { ADD_USER_FORM_LOCAL_STORAGE, ADD_USER_FORM_SESSION_STORAGE } from '@/js/constants/addUserForm'
import { USER_PATH } from '@/js/constants/serverUrl'

export class AppRequestHandler {
    static getUsers = {
        pending: (state, action) => {
            state.getUsers.isLoading = true
        },
        fulfilled: (state, action) => {
            state.users = action.payload
        },
        rejected: (state, action) => {
	        state.getUsers.error = action.payload.message
        },
        settled: (state, action) => {
            state.getUsers.isLoading = false
        }
    }
    static postUser = {
        pending: (state, action) => {
            state.postUser.isLoading = true
        },
        fulfilled: (state, action) => {
            const { userJson, storages } = action.payload
            state.users.push(userJson)

            storages.forEach(st => {
                const storageId = st.split(' ')[0]
                const currentStateStorage = `usersIn${ storageId }Storage`

                state[currentStateStorage].push(userJson)

                const currentStorage = st === ADD_USER_FORM_LOCAL_STORAGE.value ?
                    localStorage
                    :
                    sessionStorage

                currentStorage.setItem(USER_PATH, JSON.stringify(state[currentStateStorage]))
            })
        },
        rejected: (state, action) => {
            state.postUser.error = action.payload.message
        },
        settled: (state, action) => {
            state.postUser.isLoading = false
        }
    }

	static deleteUser = {
		pending: (state, action) => {
			state.deleteUser.isLoading = true
		},
		fulfilled: (state, action) => {
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
		},
		rejected: (state, action) => {
			state.deleteUser.error = action.payload.message
		},
		settled: (state, action) => {
			state.deleteUser.isLoading = false
		}
	}
}