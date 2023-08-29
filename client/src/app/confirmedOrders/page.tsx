"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/store";
import axios from "axios";
import "../../styles/css/style.css";

export default function ConfirmedOrders() {
  const [orders, setOrders] = useState([]);
  const { hasAccessToken, setHasAccessToken } = useGlobalContext();

  const host = process.env.HOST;
  const port = process.env.PORT;

  useEffect(() => {
    axios
      .get(`http://${host}:${port}/auth/checkTokens`, { withCredentials: true })
      .then((res) => {
        setHasAccessToken(res.data);
        if (res.data == true)
          axios
            .get(`http://${host}:${port}/orders/getConfirmedOrders`, {
              withCredentials: true,
            })
            .then((res) => setOrders(res.data))
            .catch((err) => console.log(err));
      });
  }, [orders]);
  
  return (
    <>
      {hasAccessToken ? (
        <div className="orders-container">
          {orders.length != 0 ? (
            orders.map((el: any) => {
              return (
                <div className="order-item" key={el.id}>
                  <div className="order-info">
                    <div className="order-text">Order id: {el.id}</div>
                    <div className="order-text">
                      Created at: {el.created_at}
                    </div>
                    <div className="order-text">Name: {el.name}</div>
                    <div className="order-text">Last name: {el.last_name}</div>
                    <div className="order-text">Address: {el.address}</div>
                    <div className="order-text">Status: {el.status}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>There are no confirmed orders yet</p>
          )}
        </div>
      ) : (
        <p>Login and refresh to see this page</p>
      )}
    </>
  );
}
