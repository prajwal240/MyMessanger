import React, { useState, useContext, useEffect, useRef } from 'react';
import '../CSS/ChatPage.css';
import send from '../Images/send-button_16955203.jpg';
import { MessageContext } from '../Universal/Messagedata';

export default function ChatPageRight(props) {
    const { messagedata } = useContext(MessageContext);

    const [msg, setMsg] = useState('');
    const handleSendmessage = (e) => {
        e.preventDefault();
        props.socket.emit('client_to_server', { msg, sender: messagedata.sender, reciever: messagedata.reciever });
        setMessages((prevMessages) => [...prevMessages, { msg, sender: messagedata.sender, reciever: messagedata.reciever }]);
        setMsg('');
    }

    const [messages, setMessages] = useState(null);
    useEffect(() => {
        const handleConnected = (msg) => {
            const sorted = msg.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setMessages(sorted);
        }
        props.socket.on('connected', handleConnected);
        return () => {
            props.socket.off('connected', handleConnected);
        }

    }, [props.socket, messages]);

    useEffect(() => {
        const handleSTC = (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        }
        props.socket.on('server_to_client', handleSTC);
        return () => {
            props.socket.off('server_to_client', handleSTC);
        }
    }, [props.socket]);

    const messagesEndRef = useRef(null);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="right-pane">
            <div className="chat-container">
                {messages && messages.map((message, index) => (
                    <div
                        key={index}
                        className={message.sender === messagedata.sender ? 'sent-msg' : 'rec-msg'}
                    >
                        {message.msg}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {messagedata.reciever &&
                <form onSubmit={handleSendmessage} className="chat-input-container">
                    <input placeholder='Enter a Message' type="text" value={msg} onChange={(e) => { e.preventDefault(); setMsg(e.target.value); }} className="text-bar" />
                    <button type='submit' onClick={handleSendmessage} className="send">
                        <img src={send} alt="btn-logo" />
                    </button>
                </form>
            }
        </div>
    )
}
