import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/LogInSignIn.css';
import BaseUrl from '../Universal/BaseUrl';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../Universal/Messagedata';
import { Buffer } from 'buffer';
import { AuthContext } from '../Universal/AuthContext'
import Alert from '../Universal/Alert';
import { AlertContext } from '../Universal/AlertContext';
import { LoaderContext } from '../Universal/LoaderContext';
import Loader from '../Universal/Loader';

export default function LogInSignIn(props) {
    const { loader, setLoader } = useContext(LoaderContext);

    let i=0;
    useEffect(()=>{
        if(i===0){
            i++;
            setLoader(false);
        }
    })

    const [login, setLogin] = useState(true);

    const [signindata, setSignindata] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [file, setFile] = useState(null);

    const [signin, setSignin] = useState(false);
    const nav = useNavigate();

    const { alert, setAlert } = useContext(AlertContext);
    const [msg, setMsg] = useState({
        messageclass: '',
        messagetext: ''
    });

    useEffect(() => {
        if (signin) {
            setLoader(true);
            const api = async () => {
                try {
                    const data = { ...signindata, pic: file };
                    const response = await axios.post(`${BaseUrl}/signin`, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if (response.data.message !== true) {
                        setMsg({
                            messageclass: 'alert-error',
                            messagetext: 'SignIn Failed !'
                        })
                        setAlert({ signinfailure: true });
                        setLogin(true);
                    } else {
                        setMsg({
                            messageclass: 'alert-success',
                            messagetext: 'SignIn Successful !'
                        })
                        setAlert({ signinsuccess: true });
                        setLogin(true);
                    }
                } catch (err) {
                    setMsg({
                        messageclass: 'alert-error',
                        messagetext: err
                    })
                    setAlert({ signinfailure: true });
                    setLogin(true);
                }
            }
            api();
            setSignin(false);
            setLoader(false);
        }
    }, [file, nav, signin, signindata, setAlert, setLoader]);

    const handleSigninSubmit = (e) => {
        e.preventDefault();
        setSignin(true);
    };

    const [enter, setEnter] = useState(false);
    const [logindata, setLogindata] = useState({
        mail: '',
        pass: ''
    });

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setEnter(true);
    };

    const { setMessagedata } = useContext(MessageContext);
    const { setAuthenticate } = useContext(AuthContext);

    useEffect(() => {
        if (enter) {
            setLoader(true);
            const api = async () => {
                try {
                    const response = await axios.post(`${BaseUrl}/login`, logindata);
                    if (response.data.message === true) {
                        const uint8Array = new Uint8Array(response.data.pic.data);
                        const base64String = Buffer.from(uint8Array).toString('base64');
                        setMessagedata({ sender: logindata.mail, pic: `data:image/jpeg;base64,${base64String}` });
                        setAuthenticate({ status: true });
                        props.socket.emit('login', logindata.mail);
                        nav('/chatpage');
                    } else {
                        setMsg({
                            messageclass: 'alert-error',
                            messagetext: 'Login Failed !'
                        })
                        setAlert({ loginfailure: true });
                    }
                } catch (error) {
                    setMsg({
                        messageclass: 'alert-error',
                        messagetext: error
                    })
                    setAlert({ loginfailure: true });
                }
            }
            api();
            setEnter(false);
            setLoader(false);
        }
    }, [logindata, enter, nav, setMessagedata, setAuthenticate, props.socket, setAlert, setLoader]);

    const handleLoginSwitch = (e) => {
        e.preventDefault();
        setLogindata({
            mail: '',
            pass: ''
        });
        setSignindata({
            name: '',
            email: '',
            password: ''
        });
        setFile(null);
        setLogin(true);

    };

    const handleSignInSwitch = (e) => {
        e.preventDefault();
        setLogindata({
            mail: '',
            pass: ''
        });
        setSignindata({
            name: '',
            email: '',
            password: ''
        });
        setFile(null);
        setLogin(false);
    };

    return (
        <div>
            {loader ? <Loader /> :
                <div>
                    {(alert.loginfailure || alert.signinfailure || alert.signinsuccess) && <Alert type={msg.messageclass} message={msg.messagetext} />}
                    {login ?
                        <div className="auth-container">
                            <div className="auth-card">
                                <span style={{ marginRight: "30px" }}><button type="submit" onClick={handleLoginSwitch} className="auth-change">LogIn</button></span>
                                <span><button type="submit" onClick={handleSignInSwitch} className="auth-change">SignIn</button></span>
                                <h2>LogIn</h2>
                                <form onSubmit={handleLoginSubmit}>
                                    <div className="input-group">
                                        <label htmlFor="mail">Email</label>
                                        <input type="email" id="mail" value={logindata.mail} onChange={(e) => { e.preventDefault(); setLogindata({ ...logindata, mail: e.target.value }) }} placeholder="Enter your email" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="pass">Password</label>
                                        <input type="password" id="pass" value={logindata.pass} onChange={(e) => { e.preventDefault(); setLogindata({ ...logindata, pass: e.target.value }) }} placeholder="Enter your password" />
                                    </div>
                                    <button type="submit" className="auth-btn">Login</button>
                                </form>
                            </div>
                        </div> :
                        <div className="auth-container">
                            <div className="auth-card">
                                <span style={{ marginRight: "30px" }}><button type="submit" onClick={handleLoginSwitch} className="auth-change">LogIn</button></span>
                                <span><button type="submit" onClick={handleSignInSwitch} className="auth-change">SignIn</button></span>
                                <h2>Sign Up</h2>
                                <form onSubmit={handleSigninSubmit}>
                                    <div className="input-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" required placeholder="Enter your name" value={signindata.name} onChange={(evt) => { evt.preventDefault(); setSignindata({ ...signindata, name: evt.target.value }) }} />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" required placeholder="Enter your email" value={signindata.email} onChange={(evt) => { evt.preventDefault(); setSignindata({ ...signindata, email: evt.target.value }) }} />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" required id="password" placeholder="Create a password" value={signindata.password} onChange={(evt) => { evt.preventDefault(); setSignindata({ ...signindata, password: evt.target.value }) }} />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="picture">Profile Picture</label>
                                        <input type="file" required id="picture" onChange={(evt) => setFile(evt.target.files[0])} />
                                    </div>
                                    <button type="submit" className="auth-btn" >Sign Up</button>
                                </form >
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
