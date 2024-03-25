import { AppErrorService } from '@/js/errors/AppErrorService'

export class AppValidator {
    static usersValidation(users) {
        try {
            return users.every(user => !!user.id )
        } catch (e) {
            return AppErrorService.getUsersError(500)
        }
    }
}