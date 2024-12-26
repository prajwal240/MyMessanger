import React from 'react';
import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authenticate, setAuthenticate] = useState({status:false});
    return (
        <AuthContext.Provider value={{ authenticate, setAuthenticate }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };