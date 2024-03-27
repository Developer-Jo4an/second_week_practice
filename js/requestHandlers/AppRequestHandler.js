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
}