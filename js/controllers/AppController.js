import { SERVER_URL } from '@/js/constants/server'
import { AppValidator } from '@/js/validators/AppValidator'
import { AppErrorService } from '@/js/errors/AppErrorService'

export class AppController {
    static async getUsers(_, thunkApi) {
        try {
            const users = await fetch(SERVER_URL)

            if (!users.ok) throw AppErrorService.getUsersError(users.status)

            const usersJson = await users.json()

            const isValid = AppValidator.usersValidation(usersJson)

            if (!isValid) throw AppErrorService.getUsersError(500)

            return usersJson
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
}