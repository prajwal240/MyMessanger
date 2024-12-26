import React from "react";
import { createContext, useState } from "react";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        loginsuccess: false, loginfailure: false, signinsuccess: false, signinfailure: false, searchfailure:false
    })
    return (
        <AlertContext.Provider value={{ alert, setAlert }}>
            {children}
        </AlertContext.Provider>
    )
}

export { AlertContext, AlertProvider }