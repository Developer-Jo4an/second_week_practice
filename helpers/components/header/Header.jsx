import '@/public/styles/helpers/header.css'
import Link from 'next/link'

const Header = () => {
	return (
		<header className={'header'}>
			<nav className={'header__navigation'}>
				<ul className={'header__nav-list'}>
					<li className={'header__nav-item'}>
						<Link className={'header__nav-link'} href={'/'}>Main</Link>
					</li>
					<li className={'header__nav-item'}>
						<Link className={'header__nav-link'} href={'/session-storage'}>Local storage</Link>
					</li>
					<li className={'header__nav-item'}>
						<Link className={'header__nav-link'} href={'/local-storage'}>Session storage</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header