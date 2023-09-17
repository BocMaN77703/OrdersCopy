'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../context/store'
import '../../styles/css/style.css'

const Orders = () => {
    const { hasAccessToken, setHasAccessToken } = useGlobalContext()
    const [orders, setOrders] = useState([])
    const host = process.env.HOST
    const port = process.env.SERVER_PORT
    useEffect(() => {
        if (hasAccessToken === true)
            axios
                .get(`${host}/orders/getInitializedOrders`, {
                    withCredentials: true,
                })
                .then((res) => setOrders(res.data))
                .catch((err) => console.log(err))
    }, [])

    const confirmOrder = (orderId: number) => {
        axios.post(
            `${host}/orders/confirmOrder/${orderId}`,
            {},
            {
                withCredentials: true,
            }
        )
    }

    return (
        <div>
            {hasAccessToken ? (
                <div className="orders-container">
                    {orders.length != 0 ? (
                        orders.map((el: any) => {
                            return (
                                <div className="order-item" key={el.id}>
                                    <div className="order-info">
                                        <div className="order-text">
                                            Order id: {el.id}
                                        </div>
                                        <div className="order-text">
                                            Created at: {el.created_at}
                                        </div>
                                        <div className="order-text">
                                            Name: {el.name}
                                        </div>
                                        <div className="order-text">
                                            Last name: {el.last_name}
                                        </div>
                                        <div className="order-text">
                                            Address: {el.address}
                                        </div>
                                        <div className="order-text">
                                            Status: {el.status}
                                        </div>
                                    </div>
                                    <button
                                        className="order-confirm-btn"
                                        onClick={() => {
                                            confirmOrder(el.id)
                                        }}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            )
                        })
                    ) : (
                        <p>There are no initialized orders yet</p>
                    )}
                </div>
            ) : (
                <>Login and refresh to see this page</>
            )}
        </div>
    )
}

export default Orders
