'use client'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import Main from '@/app/main/Main'

export default function Index() {
    return (
        <Provider store={ store }>
            <main>
                <Main />
            </main>
        </Provider>
    )
}
