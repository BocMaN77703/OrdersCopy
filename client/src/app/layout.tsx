"use client";
import { useRouter, usePathname } from "next/navigation";
import { GlobalContextProvider, useGlobalContext } from "./context/store";
import { useContext, useState } from "react";
import Modal from "./modal/modal";
import axios from "axios";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalActive, setIsModalActive] = useState(false);
  const [hasAccessToken, setHasAccessToken] = useState(false)
  const [code, setCode] = useState("");
  const router = useRouter();
  const pathName = usePathname();

  const login = () => {
    axios
      .post(
        `http://localhost:3003/auth/login/${code}`,
        {},
        { withCredentials: true }
      )
    setHasAccessToken(true)
    setIsModalActive(false);
    router.refresh()
  };

  const logout = () => {
    axios.post(
      `http://localhost:3003/auth/log-out/`,
      {},
      { withCredentials: true }
    );
    setHasAccessToken(false)
    setIsModalActive(false);
    router.refresh()
  };

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </head>
      <body>
        <GlobalContextProvider>
          <div className="main-container">
            <div className="main-header">
              <div
                className="header-text"
                onClick={() => {
                  router.push(pathName == "/" ? "/cart" : "/");
                }}
              >
                {pathName == "/" ? "Cart" : "Catalog"}
              </div>
              <div
                className="header-text"
                onClick={() => {
                  setIsModalActive(true);
                }}
              >
                {hasAccessToken==true ? "Log out" : "Log In"}
              </div>
              <div
                className="header-text"
                onClick={() => {
                  router.push("/orders");
                }}
              >
                Orders
              </div>
              <div
                className="header-text"
                onClick={() => {
                  router.push("/confirmedOrders");
                }}
              >
                Confirmed orders
              </div>
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
        </GlobalContextProvider>
      </body>
    </html>
  );
}
