import React from 'react';
import { Box,Text } from '@chakra-ui/react';
import SingleChat from './SingleChat';
import { ChatState } from '../Context/ChatProvider';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
const {SelectedChat} = ChatState()
  return (
    <Box
      display={{ base: SelectedChat ? "flex" : "none", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: '100%', md: '68%' }} // Adjust width for different screen sizes
      h="100%" // Ensure it takes full height
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
