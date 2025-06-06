import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, Button, Stack, Text, effect, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { AddIcon } from '@chakra-ui/icons'
import ChatLoading from './ChatLoading'
import { getSender } from '../config/ChatLogics'
import GroupChatModal from './miscellaneous/GroupChatModal'
const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState()
  const { user, setUser, setSelectedChat, SelectedChat, chats, setChats } = ChatState()

  const toast = useToast()

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          token: user.data.token
        }
      }
      console.log(user.data.token)
      const { data } = await axios.get("http://localhost:5000/chat/GetAllchat", config)
      // console.log(data)
      setChats(data.data)
      console.log(chats)
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Load chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  }

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    console.log(userInfo)
    setLoggedUser(userInfo)
    fetchChats()
    // console.log(chats)
    return () => {

    }
  }, [fetchAgain])
  return (

    <Box display={{ base: SelectedChat ? "none" : "flex", md: "flex" }}
      flexDirection={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      width={{ base: "100%", md: "31%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}>
      <Box pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={"Work sans"}
        display={"flex"}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}>
        My Chats
        <GroupChatModal>

          <Button
            display={"flex"}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}>
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY={"scroll"}>
            {chats.map((chat) => (
              <Box onClick={() => setSelectedChat(chat)}
                cursor={"pointer"}
                bg={SelectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={SelectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}>
                <Text>
                  {!chat.isGroupChat ? (
                    getSender(loggedUser, chat.users)
                  ) : (chat.chatName)}
                </Text>

              </Box>
            ))}
          </Stack>

        ) : (
          <ChatLoading />
        )}
      </Box>

    </Box>

  )
}

export default MyChats
