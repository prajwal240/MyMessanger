import React, { useState, useEffect, useContext } from 'react';
import { AlertContext } from '../Universal/AlertContext';
import ChatPageLeft from './ChatPageLeft';
import ChatPageRight from './ChatPageRight';
import Alert from '../Universal/Alert';
import '../CSS/ChatPage.css';
import "../CSS/ConfirmDialog.css";
import { MessageContext } from '../Universal/Messagedata';

export default function Chatpage(props) {
    const { alert } = useContext(AlertContext);
    const [msg, setMsg] = useState({
        messageclass: '',
        messagetext: ''
    });
    useEffect(() => {
        if (alert.loginsuccess) {
            setMsg({
                messageclass: 'alert-success-login',
                messagetext: 'Login Successful !'
            })
        }
        if (alert.searchfailure) {
            setMsg({
                messageclass: 'alert-error-search',
                messagetext: 'Check reciever email !'
            })
        }
    }, [alert]);

    const [deletedata, setDeletedata] = useState(false);

    const deleteMessages = (data) => {
        setDeletedata(data);
    }

    const onCancel=()=>{
        setDeletedata(false);
    };

    const {messagedata}=useContext(MessageContext);

    const onConfirm=()=>{
        setDeletedata(false);
        props.socket.emit('delete_msgs', { sender: messagedata.sender, reciever: messagedata.reciever });
    }

    return (
        <div>
            {(alert.loginsuccess || alert.searchfailure) && <Alert type={msg.messageclass} message={msg.messagetext} />}
            {deletedata &&
                <div className="overlay">
                    <div className="confirm-box">
                        <h2>Confirm Action</h2>
                        <p>{`Confirm delete all messages from both your and ${messagedata.reciever}'s end !`}</p>
                        <div className="buttons">
                            <button className="btn confirm" onClick={onConfirm}>
                                Yes
                            </button>
                            <button className="btn cancel" onClick={onCancel}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div className='chat-app'>
                <ChatPageLeft socket={props.socket} onDelete={deleteMessages} /><ChatPageRight socket={props.socket} deletedata={deletedata} />
            </div>
        </div>
    )
}
