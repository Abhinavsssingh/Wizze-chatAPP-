import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import Mychats from '../component/miscellaneous/MyChats'
import ChatBox from '../component/miscellaneous/ChatBox'
import SideDrawer from '../component/miscellaneous/SideDrawer'


function ChatPage() {
   
  const {user} = ChatState()


  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer />}
      <Box
      display="flex"
      justifyContent="space-between"
      w='100%'
      h='91.5vh'
      p='10px'>
        {user && <Mychats />}
        {user && <ChatBox />}
      </Box>
    </div>
  )
}

export default ChatPage
