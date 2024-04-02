'use client'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppUsersInLS, setAppUsersToStorage, setAppZeroingStorage } from '@/redux/slices/appSlice'
import { APP_USER_REM, LOCAL_STORAGE } from '@/js/constants/appSliceActStor'
import StorageUser from '@/components/users/storage-user/StorageUser'

const Local = () => {
    const dispatch = useDispatch()
    const usersInLocalSt = useSelector(selectAppUsersInLS)

    const removeUserFromSt = useCallback(user =>
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
	        <button
		        className={'storage__button button'}
		        onClick={ () => dispatch(setAppZeroingStorage(LOCAL_STORAGE)) }
	        >
		        Очистить Local Storage
	        </button>
            { !usersInLocalSt.length ?
                    <span className={ 'storage__none-users-message' }>
                        Добавьте пользователей в хранилище на главной странице
                    </span>
                    :
                    <ul className={ 'storage__list' }>
                        { usersInLocalSt.map(user =>
                            <li className={ 'storage__item' } key={ user.id }>
                                <StorageUser user={ user } removeFromSt={ removeUserFromSt } />
                            </li>
                        ) }
                    </ul>
            }
        </section>
    )
}

export default Local