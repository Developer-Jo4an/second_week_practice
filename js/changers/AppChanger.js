export class AppChanger {
    static postUserChange(user) {
        const {
            name, username, email, phone, website,
            city, street, suite, lat, lng, zipcode,
            companyName, bs, catchPhrase, ...storages
        } = user

        return {
            newUser: {
                name, username, email, phone, website,
                address: { city, street, suite, geo: { lat, lng }, zipcode },
                company: { name: companyName, bs, catchPhrase }
            },
            storages
        }
    }
}