import React from 'react'
import SessionClient from "../client/sessionClient";
import SessionProvider from "../provider/sessionProvider";

export const Session = () => {
    const rol = window.localStorage.getItem("rol");
    return (
        <div className=" p-8 text-gray text-sm font-light">
            {/* acá debería estar la sesión del user {rol}. */}
            {rol === "Client" && <SessionClient></SessionClient>}
            {rol === "Provider" && <SessionProvider></SessionProvider>}
        </div>
    )
}
export default Session;
