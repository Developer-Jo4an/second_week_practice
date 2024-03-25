import { Inter } from 'next/font/google'
import '@/public/styles/full/full.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Second Week Practice',
    description: 'Second Week Practice | Training',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={ inter.className }>
        { children }
        </body>
        </html>
    )
}
