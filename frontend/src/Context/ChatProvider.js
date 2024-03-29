import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext()

const ChatProvider = ({children}) => {

    const [user, setUser] = useState()
    const [SelectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])

    const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        setUser(userInfo);
    
        if (!userInfo) history.push("/");
      }, [history]);
    return (
        <ChatContext.Provider value={{user,setUser,setSelectedChat,SelectedChat,chats, setChats}}>
            {children}
        </ChatContext.Provider>
    )
}
export const ChatState = () => {
    return useContext(ChatContext)
}


export default ChatProvider