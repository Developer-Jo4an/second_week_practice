'use client'
import Link from 'next/link'
import '@/public/styles/helpers/header.css'
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathName = usePathname()

    const links = [
        { href: '/', label: 'Main' },
        { href: '/local-storage', label: 'Local storage' },
        { href: '/session-storage', label: 'Session storage' },
        { href: '/add-user', label: 'Add user' },
        { href: '/game', label: 'Game' },
        { href: '/bezier', label: 'Bezier' },
        { href: '/cube', label: 'Cube' },
    ]

    return (
        <header className={ `header ${ pathName === '/game' && 'header-hide' }` }>
            <nav className={ 'header__navigation' }>
                <ul className={ 'header__nav-list' }>
                    { links.map(({ href, label }) =>
                        <li key={ href } className={ 'header__nav-item' }>
                            <Link
                                className={ 'header__nav-link' }
                                href={ href }
                            >{ label }</Link>
                        </li>
                    ) }
                </ul>
            </nav>
        </header>
    )
}

export default Header