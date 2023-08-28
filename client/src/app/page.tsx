"use client";
import axios from "axios";
import "../styles/css/style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useGlobalContext } from "./context/store";

const Home = () => {
  const { cartId, setCartId } = useGlobalContext();
  const [products, setProducts] = useState<any[]>([]);

  const router = useRouter();

  const buyProduct = (itemId: number) => {
    if (cartId == 0) {
      axios.post("http://localhost:3003/cart/create").then((res) => {
        setCartId(res.data.id);
        axios.post("http://localhost:3003/cart/addProduct", {
          cartId: res.data.id,
          itemId: itemId,
          count: 1,
        });
      });
    } else {
      const res2 = axios.post("http://localhost:3003/cart/addProduct", {
        cartId: cartId,
        itemId: itemId,
        count: 1,
      });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3003/getAllProducts").then((res) => {
      setProducts(res.data);
    });
  }, [products]);

  return (
    <div className="main-content">
      {products.map((el) => {
        return (
          <div className="main-item" key={el.id}>
            <img className="main-item-image" src={el.image} alt="empty image" />
            <div className="main-item-text-container">
              <div className="main-item-name">Name: {el.name}</div>
              <div className="main-item-description">
                Description: {el.description}
              </div>
              <div className="main-item-price">Price: {el.price} $</div>
              <button
                className="main-item-btn"
                onClick={() => {
                  buyProduct(el.id);
                }}
              >
                Buy
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;