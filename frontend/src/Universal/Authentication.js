import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'

export default function Authentication() {
    const { authenticate } = useContext(AuthContext);
    return (
        authenticate.status ? <Outlet /> : <Navigate to='/login' />
    );
}
