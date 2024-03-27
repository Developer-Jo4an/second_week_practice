export class AppErrorService {
    static getUsersError(statusCode) {
        switch (statusCode.toString()[0]) {
            case '4' : return new Error('Invalid users data: client error(400)')
            case '5' : return new Error('Invalid users data: server error(500)')
        }
    }
    static postUserError(statusCode) {
        switch (statusCode.toString()[0]) {
            case '4' : return new Error('Invalid user data: client error(400)')
            case '5' : return new Error('Invalid user data: server error(500)')
        }
    }
	static deleteUserError(statusCode) {
		switch (statusCode.toString()[0]) {
			case '4' : return new Error('Invalid user id: client error(400)')
			case '5' : return new Error('Invalid user id: server error(500)')
		}
	}
}
