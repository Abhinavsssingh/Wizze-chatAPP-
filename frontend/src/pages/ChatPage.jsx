import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import Mychats from '../component/MyChats'
import ChatBox from '../component/ChatBox'
import SideDrawer from '../component/miscellaneous/SideDrawer'


function ChatPage() {
   
  const {user} = ChatState()
  const [fetchAgain,setFetchAgain] = useState(false)


  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer />}
      <Box
      display="flex"
      justifyContent="space-between"
      width='100%'
      height='94vh'
      padding='10px'
      >
        {user && <Mychats fetchAgain={fetchAgain}  />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  )
}

export default ChatPage
