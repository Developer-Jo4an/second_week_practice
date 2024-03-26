'use client'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppFull, setAppUsersAsync, setAppUsersToStorage } from '@/redux/slices/appSlice'
import MainUser from '@/components/users/main-user/MainUser'
import Loader from '@/components/loader/Loader'

const Main = () => {
    const dispatch = useDispatch()

    const {
        isLoading,
        error,
        users,
        usersInLocalStorage,
        usersInSessionStorage
    } = useSelector(selectAppFull)

                                          // data === { user, actionValue, storage }
    const setToStorage = useCallback((data) => dispatch(setAppUsersToStorage(data)), [])

    return (
        <section className={ 'main page' }>
            {
            users.length ?
                <>
                    <h1 className={ 'main__subject index-subject' }>
                        Массив всех пользователей, которых можно добавить(удалить) в какую-либо сессию.
                    </h1>
                    <ul className={ 'main__user-list' }>
                        { users.map(user => {
                            const inLocal = usersInLocalStorage.some(customer => user.id === customer.id)
                            const inSession = usersInSessionStorage.some(customer => user.id === customer.id)

                            return <li className={ 'main__user-item' } key={ user.id }>
                                    <MainUser
                                        user={ user }
                                        inLocal={ inLocal }
                                        inSession={ inSession }
                                        setToStorage={ setToStorage }
                                    />
                                </li>
                        }) }
                    </ul>
                </>
            :
            error ?
                <div>{ error }</div>
                :
                <button
                    className={ 'main__button button' }
                    onClick={ () => dispatch(setAppUsersAsync()) }
                >GET USERS</button>
        }
        { isLoading && <Loader /> }
        </section>
    )
}

export default Main