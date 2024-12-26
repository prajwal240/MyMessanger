import { createContext, useState } from "react";

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
    const [messagedata, setMessagedata] = useState({ sender: '', reciever: '', sent: '', recieved: '', time: '', pic: null });
    return (
        <MessageContext.Provider value={{ messagedata, setMessagedata }}>
            {children}
        </MessageContext.Provider>
    );
}

export { MessageContext, MessageProvider };