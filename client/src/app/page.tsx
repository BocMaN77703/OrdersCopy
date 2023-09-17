'use client'

import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useGlobalContext } from './context/store'
import '../styles/css/style.css'

const Home = () => {
    const { cartId, setCartId } = useGlobalContext()
    const [products, setProducts] = useState<any[]>([])
    const [cookies, setCookie, removeCookie] = useCookies(['cartId'])
    const host = process.env.HOST
    const buyProduct = (itemId: number) => {
        if (cartId == 0) {
            axios.post(`${host}/cart/create`).then((res) => {
                setCartId(res.data.id)
                setCookie('cartId', res.data.id, { path: '/' })
                axios.post(`${host}/cart/addProduct`, {
                    cartId: res.data.id,
                    itemId: itemId,
                    count: 1,
                })
            })
        } else {
            axios.post(`${host}/cart/addProduct`, {
                cartId: cartId,
                itemId: itemId,
                count: 1,
            })
        }
    }

    useEffect(() => {
        axios.get(`${host}/getAllProducts`).then((res) => {
            setProducts(res.data)
        })
    }, [])

    return (
        <div className="main-content">
            {products.map((el) => {
                return (
                    <div className="main-item" key={el.id}>
                        <img
                            className="main-item-image"
                            src={el.image}
                            alt="empty image"
                            loading='lazy'
                        />
                        <div className="main-item-text-container">
                            <div className="main-item-name">
                                Name: {el.name}
                            </div>
                            <div className="main-item-description">
                                Description: {el.description}
                            </div>
                            <div className="main-item-price">
                                Price: {el.price} $
                            </div>
                            <button
                                className="main-item-btn"
                                onClick={() => {
                                    buyProduct(el.id)
                                }}
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Home
