import { AppErrorService } from '@/js/errors/AppErrorService'
import { ADD_USER_FORM_LOCAL_STORAGE, ADD_USER_FORM_SESSION_STORAGE } from '@/js/constants/addUserForm'
import * as yup from 'yup'

export class AppValidator {
    static getUsersValidationAfterRequest(users) {
        try {
            return users.every(user => !!user.id)
        } catch (e) {
            return AppErrorService.getUsersError(500)
        }
    }

    static postUserValidationAfterRequest(user) {
        try {
            return !!user.id
        } catch (e) {
            return AppErrorService.postUserError(500)
        }
    }

    static postUserValidation() {
        const generalValidation = (min, max) =>
            yup
            .string()
            .required('Required to fill out')
            .matches(/^[a-zA-Z]*$/, 'Only latin symbols')
            .min(min, `Invalid length: length >= ${ min }`)
            .max(max, `Invalid length: length <= ${ max }`)

        const generalNoLatinValidation = yup
        .string()
        .required('Required to fill out')
        .min(1, `Invalid length: length >= 1`)
        .max(100, `Invalid length: length <= 100`)

        const phoneValidation = yup
        .string()
        .required('Required to fill out')
        .matches(/^\+7\d{10}$/, 'Prefix must be +7')
        .length(12, 'Length should be 12')

        const emailValidation = yup
        .string()
        .required('Required to fill out')
        .email('Invalid email')

        const websiteValidation = yup
        .string()
        .required('Required to fill out')
        .matches(/^(https?:\/\/)?([\da-z.-]+)\.(ru|com|net|org|edu|gov|mil)([\/\w .-]*)*\/?$/, 'Invalid website')

        const geoValidation = measure => yup
        .string()
        .required('Required to fill out')
        .test('is-valid', `${ measure } should be a number`, value => value !== '' && !value.includes('e') && !isNaN(+value))
        .test('is-within', `-180 <= ${ measure } <= 180`, value => +value > -180 && +value < 180)

        const zipcodeValidation = yup
        .string()
        .required('Required to fill out')
        .matches(/^\d{5}-\d{4}$/, 'Format: 42424-4242')

        const storageValidation = yup.array()
        .of(yup.string()
        .oneOf([ADD_USER_FORM_LOCAL_STORAGE.value, ADD_USER_FORM_SESSION_STORAGE.value]))

        return yup.object().shape({
            name: generalValidation(2, 40),
            username: generalNoLatinValidation,
            phone: phoneValidation,
            email: emailValidation,
            website: websiteValidation,
            city: generalNoLatinValidation,
            street: generalNoLatinValidation,
            suite: generalNoLatinValidation,
            lng: geoValidation('lng'),
            lat: geoValidation('lat'),
            zipcode: zipcodeValidation,
            companyName: generalNoLatinValidation,
            bs: generalNoLatinValidation,
            catchPhrase: generalNoLatinValidation,
            storage: storageValidation
        })
    }
}