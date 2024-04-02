'use client'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

const Root = ({ children }) => {
    return (
        <Provider store={ store }>
            <main>{ children }</main>
        </Provider>
    )
}

export default Root