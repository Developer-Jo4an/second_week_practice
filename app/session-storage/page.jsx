'use client'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppUsersInSS, setAppUsersToStorage, setAppZeroingStorage } from '@/redux/slices/appSlice'
import { APP_USER_REM, LOCAL_STORAGE, SESSION_STORAGE } from '@/js/constants/appSliceActStor'
import StorageUser from '@/components/users/storage-user/StorageUser'

const Session = () => {
    const dispatch = useDispatch()
    const usersInLocalSs = useSelector(selectAppUsersInSS)

    const removeFromSt = useCallback(user =>
            dispatch(setAppUsersToStorage({
                user,
                actionValue: APP_USER_REM,
                storage: SESSION_STORAGE
            }))
    , [])

    return (
	    <section className={ 'storage page' }>
		    <h1 className={ 'storage__subject index-subject' }>
			    Список пользователей в Session Storage
		    </h1>
		    <button
			    className={ 'storage__button button' }
			    onClick={ () => dispatch(setAppZeroingStorage(SESSION_STORAGE)) }
		    >
			    Очистить Session Storage
		    </button>
		    {
			    !usersInLocalSs.length ?
				    <span className={ 'storage__none-users-message' }>
                        Добавьте пользователей в хранилище на главной странице
                    </span>
				    :
				    <ul className={ 'storage__list' }>
					    { usersInLocalSs.map(user =>
						    <li className={ 'storage__item' } key={ user.id }>
							    <StorageUser user={ user } removeFromSt={ removeFromSt }/>
						    </li>
					    ) }
				    </ul>
		    }
	    </section>
    )
}

export default Session