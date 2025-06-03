import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {getSender} from '../config/ChatLogics'
import {getSender_full} from '../config/ChatLogics'
import Profile from './miscellaneous/Profile';
import "./style.css";
import UpdateGroupChatModal from './miscellaneous/updateGroupChatModal';    

function SingleChat(fetchAgain, setFetchAgain) {
    const { user, SelectedChat, setSelectedChat } = ChatState()
    return <>{
        SelectedChat ? (<>
            <Text
                fontSize={{ base: "28px", md: "30px" }}
                pb={3}
                px={2}
                w="100%"
                fontFamily="Work sans"
                display="flex"
                justifyContent={{ base: "space-between" }}
                alignItems="center"
            >
                <IconButton
                    display={{ base: "flex", md: "none" }}
                    icon={<ArrowBackIcon />}
                    onClick={() => setSelectedChat("")} />


                {!SelectedChat.isGroupChat ? (
                <>{getSender(user, SelectedChat.users)}
                <Profile user={getSender_full(user, SelectedChat.users)} />

                </>):
                (
                <>
                    {console.log(SelectedChat.chatName.toUpperCase())}
                    {SelectedChat.chatName.toUpperCase()}
                    <UpdateGroupChatModal 
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                />
                </>
                )
            }
            </Text>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                p={3}
                bg="#E8E8E8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
                ></Box>
        </>) : (
            <Box display="flex" justifyContent="flex-end" h="100%">
                <Text fontSize="3xl" pb={3} fontFamily="Work sans"
                >
                    Click on user to start chatting
                </Text>

            </Box>
        )
    }</>
}

export default SingleChat
