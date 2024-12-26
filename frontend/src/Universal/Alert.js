import React, { useContext, useEffect } from 'react';
import { AlertContext } from './AlertContext';
import '../CSS/Alert.css';

export default function Alert(props) {

    const { alert, setAlert } = useContext(AlertContext);
    useEffect(() => {
        if (alert.loginsuccess || alert.loginfailure || alert.signinsuccess || alert.signinfailure || alert.searchfailure) {
            setTimeout(() => {
                setAlert({
                    loginsuccess: false, loginfailure: false, signinsuccess: false, signinfailure: false, searchfailure: false
                })
            }, 4000);
        }
    }, [alert, setAlert]);

    return (
        <div className={`${props.type} alert`} role="alert">
            <span>{props.message}</span>
        </div>
    )
}
