'use client'

import { CookiesProvider } from 'react-cookie'
import { GlobalContextProvider } from './context/store'
import Header from './header'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CookiesProvider>
            <html lang="en">
                <head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    ></meta>
                </head>
                <body>
                    <GlobalContextProvider>
                        <Header children={children}></Header>
                    </GlobalContextProvider>
                </body>
            </html>
        </CookiesProvider>
    )
}
