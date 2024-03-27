'use client'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AppValidator } from '@/js/validators/AppValidator'
import { selectAppPostUser, setAppUserAsync } from '@/redux/slices/appSlice'
import AddUserInput from '@/components/add-user/AddUserInput'
import Loader from '@/components/loader/Loader'
import {
    ADD_USER_FORM_BS,
    ADD_USER_FORM_CATCH_PHRASE,
    ADD_USER_FORM_CITY,
    ADD_USER_FORM_COMPANY_NAME,
    ADD_USER_FORM_EMAIL,
    ADD_USER_FORM_LAT,
    ADD_USER_FORM_LEGENDS,
    ADD_USER_FORM_LNG,
    ADD_USER_FORM_NAME,
    ADD_USER_FORM_STREET,
    ADD_USER_FORM_SUITE,
    ADD_USER_FORM_PHONE,
    ADD_USER_FORM_USERNAME,
    ADD_USER_FORM_WEBSITE,
    ADD_USER_FORM_ZIPCODE,
    ADD_USER_FORM_LOCAL_STORAGE,
    ADD_USER_FORM_SESSION_STORAGE
} from '@/js/constants/addUserForm'

const AddUser = () => {
    const dispatch = useDispatch()
    const formInputData = useMemo(() => [
        {
            legend: ADD_USER_FORM_LEGENDS.personalData,
            inputChunks: [
                [ADD_USER_FORM_NAME, ADD_USER_FORM_USERNAME, ADD_USER_FORM_PHONE], // main inputs
                [ADD_USER_FORM_EMAIL, ADD_USER_FORM_WEBSITE] // secondary inputs
            ]
        },
        {
            legend: ADD_USER_FORM_LEGENDS.address,
            inputChunks: [
                [ADD_USER_FORM_CITY, ADD_USER_FORM_STREET, ADD_USER_FORM_SUITE],
                [ADD_USER_FORM_LNG, ADD_USER_FORM_LAT, ADD_USER_FORM_ZIPCODE]
            ]
        },
        {
            legend: ADD_USER_FORM_LEGENDS.workPlace,
            inputChunks: [
                [ADD_USER_FORM_COMPANY_NAME, ADD_USER_FORM_BS],
                [ADD_USER_FORM_CATCH_PHRASE]
            ]
        },
        {
            legend: ADD_USER_FORM_LEGENDS.storages,
            inputChunks: [
                [ADD_USER_FORM_LOCAL_STORAGE, ADD_USER_FORM_SESSION_STORAGE]
            ]
        }
    ], [])

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({ resolver: yupResolver(AppValidator.postUserValidation()) })

    const { isLoading, error } = useSelector(selectAppPostUser)

    return (
        <section className={ 'add-user page' }>
            <h1 className={ 'add-user__subject index-subject' }>Создайте нового пользователя</h1>
            <form
                className={ 'add-user__form' }
                onSubmit={ handleSubmit(formData => { dispatch(setAppUserAsync(formData)); reset() }) }
                method={ 'post' }
            >
                { formInputData.map(({ legend, inputChunks }) =>
                    <fieldset key={ legend } className={ 'add-user__fieldset' }>
                        <legend className={ 'add-user__legend' }>{ legend }</legend>
                        <div className={ 'add-user__form-container' }>
                            { inputChunks.map((chunk, key) =>
                                <div className={ 'add-user__wrapper' } key={ key }>
                                    <div className={ 'add-user__sub-wrapper' }>
                                        { chunk.map(input =>
                                            <AddUserInput
                                                key={ input.id }
                                                input={ input }
                                                register={ register }
                                                error={ errors?.[input.key] && errors[input.key].message }
                                            />
                                        ) }
                                    </div>
                                </div>
                            ) }
                        </div>
                    </fieldset>
                ) }
                <div className={ 'add-user__buttons' }>
                    <input className={ 'add-user__btn button' } type="reset"/>
                    <input className={ 'add-user__btn button' } type="submit"/>
                </div>
            </form>
            { error && <div>{ error }</div> } {/* todo: Сделать нормальную обработку ошибок */ }
            { isLoading && <Loader/> }
        </section>
    )
}

export default AddUser