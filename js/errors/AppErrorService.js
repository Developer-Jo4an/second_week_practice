export class AppErrorService {
    static getUsersError(statusCode) {
        switch (statusCode.toString()[0]) {
            case '4' : return new Error('Invalid users data client error(400)')
            case '5' : return new Error('Invalid users data server error(500)')
        }
    }
}
