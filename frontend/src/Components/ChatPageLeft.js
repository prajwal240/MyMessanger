import React, { useContext, useEffect, useState } from 'react';
import '../CSS/ChatPage.css';
import { MessageContext } from '../Universal/Messagedata';
import axios from 'axios';
import BaseUrl from '../Universal/BaseUrl';
import { Buffer } from 'buffer';
import { AuthContext } from '../Universal/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../Universal/AlertContext';
import { LoaderContext } from '../Universal/LoaderContext';
import Loader from '../Universal/Loader';
import dlt from '../Images/delete.png';

export default function ChatPageLeft(props) {
    const { loader, setLoader } = useContext(LoaderContext);

    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        setAlert({
            loginsuccess: true
        })
    }, [setAlert])

    const { messagedata, setMessagedata } = useContext(MessageContext);
    const [email, setEmail] = useState('');
    const [search, setSearch] = useState(false);
    const [profileview, setProfileview] = useState(false);

    const handlefetch = (e) => {
        e.preventDefault();
        setSearch(true);
    };

    const [recieverdata, setRecieverdata] = useState({
        profile_pic: null,
        rec_email: '',
        rec_name: ''
    });

    useEffect(() => {
        if (search) {
            if (email !== messagedata.sender) {
                setLoader(true);
                const api = async () => {
                    try {
                        const response = await axios.post(`${BaseUrl}/leftpane`, { email });
                        if (response.data.message === true) {
                            setProfileview(true);
                            const uint8Array = new Uint8Array(response.data.pic.data);
                            const base64String = Buffer.from(uint8Array).toString('base64');
                            setRecieverdata({ profile_pic: `data:image/jpeg;base64,${base64String}`, rec_email: email, rec_name: response.data.name });
                            setMessagedata({ ...messagedata, reciever: email });
                            props.socket.emit('connected', { sender: messagedata.sender, reciever: email });
                        } else {
                            setAlert({ searchfailure: true });
                        }
                    } catch (err) {
                        setAlert({ searchfailure: true });
                    }
                }
                api();
                setSearch(false);
                setLoader(false);
            } else {
                setAlert({ searchfailure: true });
            }
        }
    }, [search, setSearch, email, messagedata, setMessagedata, props.socket, setAlert, setLoader]);

    const nav = useNavigate();
    const { setAuthenticate } = useContext(AuthContext);
    const handleLogout = (e) => {
        e.preventDefault();
        setLoader(true);
        props.socket.emit('logout', { sender: messagedata.sender });
        setLoader(false);
        nav('/login');
        setAuthenticate({ status: false });
    }

    const [remove, setRemove] = useState(true);
    const handleDelete = () => {
        setRemove(true);
        props.onDelete(remove);
    }


    return (
        <>
            {loader ? <Loader /> :
                <div className="left-pane">
                    <nav className="nav" >
                        <div className="navbar-logo">MyMessenger</div>
                        <div className="navbar-profile">
                            {profileview && <button className="delete" onClick={handleDelete}><img src={dlt} alt='delete' /></button>}
                            <img src={messagedata.pic} alt="Profile" className="profile-photo" />
                            <button className="logout-button" onClick={handleLogout}>Logout</button>
                        </div>
                    </nav >

                    <div className="content">
                        <input id='search' placeholder='Email of Reciever' value={email} onChange={(e) => { e.preventDefault(); setEmail(e.target.value); }} type="email" />
                        <button className='enter' onClick={handlefetch}>Enter</button>
                    </div >
                    {profileview && <><div>
                        <h1><b>{recieverdata.rec_name}</b></h1>
                    </div>
                        <div className="reciever-photo-mail">
                            <img src={recieverdata.profile_pic} className="reciever-photo" alt="Profile" />
                            <h3>{recieverdata.rec_email}</h3>
                        </div></>}
                </div >
            }
        </>
    )
}
