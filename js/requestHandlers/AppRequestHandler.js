export class AppRequestHandler {
    static getUsers = {
        pending: (state, action) => {
            state.isLoading = true
        },
        fulfilled: (state, action) => {
            state.users = action.payload
        },
        rejected: (state, action) => {
            state.error = action.payload.message
        },
        settled: (state, action) => {
            state.isLoading = false
        }
    }
}