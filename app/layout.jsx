import { Inter } from 'next/font/google'
import Header from '@/components/header/Header'
import Root from '@/app/Root'
import '@/public/styles/full/full.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Second Week Practice',
	description: 'Second Week Practice | Training',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
		<body className={ inter.className }>
			<Header />
			<Root>
				{ children }
			</Root>
		</body>
		</html>
	)
}
