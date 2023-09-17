import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import Modal from './modal/modal'
import { useGlobalContext } from './context/store'

export default function Header({ children }: { children: React.ReactNode }) {
    const [isModalActive, setIsModalActive] = useState(false)
    const { hasAccessToken, setHasAccessToken } = useGlobalContext()
    const [code, setCode] = useState('')
    const pathName = usePathname()

    const host = process.env.HOST

    const login = () => {
        axios.post(`${host}/auth/login/${code}`, {}, { withCredentials: true })
        setHasAccessToken(true)
        setIsModalActive(false)
    }

    const logout = () => {
        axios.post(`${host}/auth/log-out/`, {}, { withCredentials: true })
        setHasAccessToken(false)
        setIsModalActive(false)
    }
    return (
        <>
            <div className="main-container">
                <div className="main-header">
                    {pathName == '/' ? (
                        <Link className="header-text" href={'/cart'}>
                            Cart
                        </Link>
                    ) : (
                        <Link className="header-text" href={'/'}>
                            Catalog
                        </Link>
                    )}
                    <div
                        className="header-text"
                        onClick={() => {
                            setIsModalActive(true)
                        }}
                    >
                        {hasAccessToken == true ? 'Log out' : 'Log In'}
                    </div>
                    <Link className="header-text" href={'/orders'}>
                        Orders
                    </Link>
                    <Link className="header-text" href={'/confirmedOrders'}>
                        Confirmed orders
                    </Link>
                </div>

                {children}
            </div>
            <Modal active={isModalActive} setActive={setIsModalActive}>
                {!hasAccessToken ? (
                    <div className="login-container">
                        <input
                            className="login-input"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        ></input>
                        <button className="login-btn" onClick={login}>
                            Log in
                        </button>
                    </div>
                ) : (
                    <div className="login-container">
                        <div className="log-out-question">
                            Are you sure u want to log out?
                        </div>
                        <button className="login-btn" onClick={logout}>
                            Yes
                        </button>
                    </div>
                )}
            </Modal>
        </>
    )
}
