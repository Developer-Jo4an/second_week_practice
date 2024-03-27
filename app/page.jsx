'use client'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectAppDeleteUser,
	selectAppGetUsers, setAppDeleteUserAsync, setAppDeleteUserZeroingError,
	setAppGetUsersAsync, setAppGetUsersZeroingError,
	setAppUsersToStorage
} from '@/redux/slices/appSlice'
import MainUser from '@/components/users/main-user/MainUser'
import Loader from '@/components/loader/Loader'
import Error from '@/components/error/Error'

const Main = () => {
    const dispatch = useDispatch()

    const {
        isLoading: isGetUsersLoading,
        error: getUsersError,
        users,
        usersInLocal,
        usersInSession
    } = useSelector(selectAppGetUsers)

	const {
		isLoading: isDeleteUserLoading,
		error: deleteUserError
	} = useSelector(selectAppDeleteUser)

    // data === { user, actionValue, storage }
    const setToStorage = useCallback(data => dispatch(setAppUsersToStorage(data)), [])
    const deleteUser = useCallback(id => dispatch(setAppDeleteUserAsync(id)), [])

	const zeroingGetUsersError = () => dispatch(setAppGetUsersZeroingError())
	const zeroingPostUserError = () => dispatch(setAppDeleteUserZeroingError())

    return (
        <section className={ 'main page' }>
            <h1 className={ 'main__subject index-subject' }>
                Массив всех пользователей, которых можно добавить(удалить) в какое-либо хранилище.
            </h1>
            <button
                className={ 'main__button button' }
                onClick={ () => dispatch(setAppGetUsersAsync()) }
            >GET USERS
            </button>
            {
                users.length ?
                    <ul className={ 'main__user-list' }>
                        { users.map(user => {
                            const inLocal = usersInLocal.some(customer => user.id === customer.id)
                            const inSession = usersInSession.some(customer => user.id === customer.id)

                            return <li className={ 'main__user-item' } key={ user.id }>
                                <MainUser
                                    user={ user }
                                    inLocal={ inLocal }
                                    inSession={ inSession }
                                    setToStorage={ setToStorage }
                                    deleteUser={ deleteUser }
                                />
                            </li>
                        }) }
                    </ul> : ''
            }
            {
				(getUsersError || deleteUserError)
	            &&
	            <Error
		            error={ getUsersError || deleteUserError }
		            callback={ getUsersError ? zeroingGetUsersError : zeroingPostUserError }
	            />
			}
            {
				(isDeleteUserLoading || isGetUsersLoading)
	            &&
	            <Loader />
			}
        </section>
    )
}

export default Main