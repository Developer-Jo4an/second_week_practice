'use client'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppUsersInLS, setAppUsersToStorage } from '@/redux/slices/appSlice'
import { APP_USER_REM, LOCAL_STORAGE } from '@/js/constants/appSliceActStor'
import StorageUser from '@/components/users/Storage-user/StorageUser'

const Local = () => {
    const dispatch = useDispatch()
    const usersInLocalSt = useSelector(selectAppUsersInLS)

    const removeFromSt = useCallback(user =>
        dispatch(setAppUsersToStorage({
            user,
            actionValue: APP_USER_REM,
            storage: LOCAL_STORAGE
        }))
     , [])

    return (
        <section className={ 'storage page' }>
            <h1 className={ 'storage__subject index-subject' }>
                Список пользователей в Local Storage
            </h1>
            {
                !usersInLocalSt.length ?
                    <span className={ 'storage__none-users-message' }>
                        Добавите пользователей в хранилище на главной странице
                    </span>
                    :
                    <ul className={ 'storage__list' }>
                        { usersInLocalSt.map(user =>
                            <li className={ 'storage__item' } key={ user.id }>
                                <StorageUser user={ user } removeFromSt={ removeFromSt } />
                            </li>
                        ) }
                    </ul>
            }
        </section>
    )
}

export default Local