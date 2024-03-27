'use client'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectAppGetUsers,
    setAppUsersAsync,
    setAppUsersToStorage,
    setDeleteUserEverywhere
} from '@/redux/slices/appSlice'
import MainUser from '@/components/users/main-user/MainUser'
import Loader from '@/components/loader/Loader'

const Main = () => {
    const dispatch = useDispatch()

    const {
        isLoading,
        error,
        users,
        usersInLocal,
        usersInSession
    } = useSelector(selectAppGetUsers)

    // data === { user, actionValue, storage }
    const setToStorage = useCallback(data => dispatch(setAppUsersToStorage(data)), [])
    const deleteUser = useCallback(id => dispatch(setDeleteUserEverywhere(id)), [])

    return (
        <section className={ 'main page' }>
            <h1 className={ 'main__subject index-subject' }>
                Массив всех пользователей, которых можно добавить(удалить) в какое-либо хранилище.
            </h1>
            <button
                className={ 'main__button button' }
                onClick={ () => dispatch(setAppUsersAsync()) }
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
            { error && <div>{ error }</div> } {/* todo: Сделать нормальную обработку ошибок */ }
            { isLoading && <Loader/> }
        </section>
    )
}

export default Main