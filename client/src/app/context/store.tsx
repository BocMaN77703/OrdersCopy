'use client'

import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
    ReactNode,
} from 'react'
import { useCookies } from 'react-cookie'

interface ContextProps {
    cartId: number
    setCartId: Dispatch<SetStateAction<number>>
    hasAccessToken: boolean
    setHasAccessToken: Dispatch<SetStateAction<boolean>>
}

const GlobalContext = createContext<ContextProps>({
    cartId: 0,
    setCartId: (): number => 0,
    hasAccessToken: false,
    setHasAccessToken: (): boolean => false,
})

export const GlobalContextProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['cartId'])
    const [cartId, setCartId] = useState(
        cookies.cartId ? parseInt(cookies.cartId) : 0
    )
    const [hasAccessToken, setHasAccessToken] = useState(false)

    return (
        <GlobalContext.Provider
            value={{ cartId, setCartId, hasAccessToken, setHasAccessToken }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)
