'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '@/app/context/store'
import Modal from '../modal/modal'
import '../../styles/css/style.css'

const page = () => {
    const { cartId, setCartId } = useGlobalContext()
    const [products, setProducts] = useState<any[]>([])
    const [modalActive, setModalActive] = useState(false)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')

    const host = process.env.HOST

    const getProducts = () => {
        axios.get(`${host}/cart/getProducts/${cartId}`).then((res) => {
            setProducts(res.data)
        })
    }

    const incCount = (itemId: number, count: number) => {
        axios.put(`${host}/cart/updateItemCount`, {
            cartId: cartId,
            itemId: itemId,
            count: count + 1,
        })
        const updatedProducts = products.map((item) =>
            item.id === itemId ? { ...item, count: count + 1 } : item
        )
        setProducts(updatedProducts)
    }

    const decCount = (itemId: number, count: number) => {
        axios.put(`${host}/cart/updateItemCount`, {
            cartId: cartId,
            itemId: itemId,
            count: count - 1,
        })
        const updatedProducts = products.map((item) =>
            item.id === itemId ? { ...item, count: count - 1 } : item
        )
        setProducts(updatedProducts)
    }

    const deleteItem = (itemId: number) => {
        axios.post(`${host}/cart/deleteItem`, {
            cartId: cartId,
            itemId: itemId,
        })
        const updatedProducts = products.filter((item) => item.id !== itemId)
        setProducts(updatedProducts)
    }

    const openModal = () => {
        setModalActive(true)
    }

    const confirmOrderInfo = () => {
        axios.post(`${host}/orders/createOrder/${cartId}`, {
            name: name,
            last_name: lastName,
            address: address,
        })
        setModalActive(false)
        setName('')
        setLastName('')
        setAddress('')
        setProducts([])
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <div className="main-content">
                {products.map((el) => {
                    return (
                        <div className="main-item" key={el.id}>
                            <img
                                className="main-item-image"
                                src={el.image}
                                alt="empty image"
                            />
                            <div className="main-item-text-container">
                                <div className="main-item-name">
                                    Name: {el.name}
                                </div>
                                <div className="main-item-description">
                                    Description: {el.description}
                                </div>
                                <div className="main-item-price">
                                    Price: {el.price * el.count} $
                                </div>
                                <div className="count-container">
                                    <button
                                        className="count-btn"
                                        onClick={() => {
                                            decCount(el.id, el.count)
                                        }}
                                    >
                                        -
                                    </button>
                                    <div className="main-item-count">
                                        {el.count}
                                    </div>
                                    <button
                                        className="count-btn"
                                        onClick={() => {
                                            incCount(el.id, el.count)
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        deleteItem(el.id)
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <button className="make-order-btn" onClick={openModal}>
                Go to checkout
            </button>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className="form-content-container">
                    <div className="form-text">Name:</div>
                    <input
                        className="form-input"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    ></input>

                    <div className="form-text">Last name:</div>
                    <input
                        className="form-input"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                    ></input>

                    <div className="form-text">Address:</div>
                    <input
                        className="form-input"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                    ></input>

                    <button
                        className="form-confirm-btn"
                        onClick={confirmOrderInfo}
                    >
                        Confirm
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default page
