'use client'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppFull, setAppUsersAsync } from '@/redux/slices/appSlice'
import User from '@/app/main/User'
import Loader from '@/helpers/components/loader/Loader'

const Main = () => {
    const dispatch = useDispatch()

    const {
		isLoading,
	    error,
	    users,
	    usersInLocalStorage,
	    usersInSessionStorage
	} = useSelector(selectAppFull)

	return (
        <section className={ 'main' }>
            {
                users.length ?
                    <ul className={ 'main__user-list' }>
                        { users.map(user => (
                            <li className={ 'main__user-item' } key={ user.id }>
                                <User user={ user }/>
                            </li>
                        )) }
                    </ul>
                    :
                    error ?
                        <div>{ error }</div>
                        :
                        <button
                            className={ 'button main__button' }
                            onClick={ () => dispatch(setAppUsersAsync()) }
                        >GET USERS</button>
            }
            { isLoading && <Loader/> }
        </section>
    )
}

export default Main