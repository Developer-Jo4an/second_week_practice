import '@/public/styles/helpers/header.css'
import Link from 'next/link'

const Header = () => {
	const links = [
		{ href: '/', label: 'Main' },
		{ href: '/local-storage', label: 'Local storage' },
		{ href: '/session-storage', label: 'Session storage' },
		{ href: '/add-user', label: 'Add user' },
	]

	return (
		<header className={'header'}>
			<nav className={'header__navigation'}>
				<ul className={ 'header__nav-list' }>
					{ links.map(({ href, label }) =>
						<li key={ href } className={ 'header__nav-item' }>
							<Link className={ 'header__nav-link' } href={ href }>{  label  }</Link>
						</li>
					) }
				</ul>
			</nav>
		</header>
	)
}

export default Header