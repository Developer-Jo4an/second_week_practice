import { FaUserSecret } from 'react-icons/fa'
import { memo } from 'react'
import { APP_USER_ADD, APP_USER_REM, LOCAL_STORAGE, SESSION_STORAGE } from '@/js/constants/appSliceActStor'

const MainUser = memo(({ user, inLocal, inSession, setToStorage, deleteUser }) => {
    const persDataChunk = {
        username: user.username,
        name: user.name,
        email: user.email,
        website: user.website
    }

    const buttonCreator = storageType => {
        const inStorage = storageType === LOCAL_STORAGE ? inLocal : inSession

        return <button
            className={ 'main-user-card__button button' }
            onClick={ () => setToStorage({
                user,
                actionValue: inStorage ? APP_USER_REM : APP_USER_ADD,
                storage: storageType
            }) }
        >{ `${ inStorage ? APP_USER_REM : APP_USER_ADD } to ${ storageType } storage` }
        </button>
    }

    return (
        <div className={ 'main__user main-user-card' }>
            <div className={ 'main-user-card__info' }>
                <div className={ 'main-user-card__user-icon' }>
                    <FaUserSecret/>
                </div>
                <ul className={ 'main-user-card__list' }>
                    { Object.entries(persDataChunk).map(([name, value]) =>
                        <li key={ name } className={ 'main-user-card__item' }>
                            <p className={ 'main-user-card__head' }>{ name }:</p>
                            <p className={ 'main-user-card__value' }>{ value }</p>
                        </li>
                    ) }
                </ul>
            </div>
            <div className={ 'main-user-card__buttons' }>
                { buttonCreator(LOCAL_STORAGE) }
                { buttonCreator(SESSION_STORAGE) }
                <button
                    className={ 'main-user-card__button button' }
                    onClick={ () => deleteUser(user.id) }
                >Delete from everywhere
                </button>
            </div>
        </div>
    )
})

export default MainUser