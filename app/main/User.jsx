import { FaUserSecret } from 'react-icons/fa'

const User = ({ user }) => {
    return (
        <div className={ 'main__user user-card' }>
            <div className={ 'user-card__user-icon' }>
                <FaUserSecret/>
            </div>
            <ul className={ 'user-card__main-info-list' }>
                <li className={'user-card__main-info-item'}>
                    <p className={ 'user-card__user-name' }>{ user.username }</p>
                </li>
                <li className={'user-card__main-info-item'}>
                    <p className={ 'user-card__name' }>{ user.name }</p>
                </li>
                <li className={'user-card__main-info-item'}>
                    <p className={ 'user-card__email' }>{ user.email }</p>
                </li>
                <li className={'user-card__main-info-item'}>
                    <p className={ 'user-card__website' }>{ user.website }</p>
                </li>
            </ul>

        </div>
    )
}

export default User