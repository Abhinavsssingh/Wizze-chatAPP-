import React from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { useState } from 'react'

function ChatPage() {

  const [chats,setChats] = useState([])

  const fetchChats = async () => {
      const data = await axios.get("/ww")
      console.log({data})
      setChats(data)
  }
 
  useEffect(() => {
    fetchChats();
  },[]);

  return (
    <div>
      ChatPage
    </div>
  )
}

export default ChatPage
