import { SERVER_URL } from '@/js/constants/serverUrl'
import { AppValidator } from '@/js/validators/AppValidator'
import { AppErrorService } from '@/js/errors/AppErrorService'
import { AppChanger } from '@/js/changers/AppChanger'

export class AppController {
	static async getUsers(_, thunkApi) {
		try {
			const users = await fetch(SERVER_URL)

			if (!users.ok) throw AppErrorService.getUsersError(users.status)

			const usersJson = await users.json()

			const isValid = AppValidator.getUsersValidationAfterRequest(usersJson)

			if (!isValid) throw AppErrorService.getUsersError(500)

			return usersJson
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}

	static async postUser(formData, thunkApi) {
		try {
			const { newUser, storages } = AppChanger.postUserChange(formData)

			const user = await fetch(SERVER_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newUser)
			})

			if (!user.ok) throw AppErrorService.postUserError(user.status)

			const userJson = await user.json()

			const isValid = AppValidator.postUserValidationAfterRequest(userJson)

			if (!isValid) throw AppErrorService.postUserError(500)

			return { userJson, storages: storages.storage }
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}

	static async deleteUser(userId, thunkApi) {
		try {
			if (!userId) throw AppErrorService.deleteUserError(400)

			const answer = await fetch(`${ SERVER_URL }/${ userId }`, {
				method: 'DELETE'
			})

			const { id } = await answer.json()

			if (!id) throw AppErrorService.deleteUserError(500)

			return id
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
}