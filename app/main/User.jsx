import { FaUserSecret } from 'react-icons/fa'

const User = ({ user, inLocal, inSession }) => {

	return (
		<div className={ 'main__user user-card' }>
			<div className={ 'user-card__info' }>
				<div className={ 'user-card__user-icon' }>
					<FaUserSecret/>
				</div>
				<ul className={ 'user-card__main-info-list' }>
					<li className={ 'user-card__main-info-item' }>
						<p className={ 'user-card__username' }>{ user.username }</p>
					</li>
					<li className={ 'user-card__main-info-item' }>
						<p className={ 'user-card__name' }>{ user.name }</p>
					</li>
					<li className={ 'user-card__main-info-item' }>
						<p className={ 'user-card__email' }>{ user.email }</p>
					</li>
					<li className={ 'user-card__main-info-item' }>
						<p className={ 'user-card__website' }>{ user.website }</p>
					</li>
				</ul>
			</div>
			<div className={ 'user-card__buttons' }>
				<button className={ 'user-card__button button' }>Add to local storage</button>
				<button className={ 'user-card__button button' }>Add to session storage</button>
			</div>
		</div>
	)
}

export default User