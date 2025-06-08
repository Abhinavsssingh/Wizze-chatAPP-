import React, { useState } from 'react';
import {
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Box,
    FormControl,
    Input,
    Spinner
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';
import { useToast } from '@chakra-ui/react';
import UserbadgeItem from '../userAvatar/UserbadgeItem';
import UserListItem from '../userAvatar/UserListItem';
import axios from 'axios';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, SelectedChat, setSelectedChat } = ChatState();
  
  const [groupChatName, setgroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const toast = useToast();

  const handleLeave = async () => {

    try {
      setLoading(true);
      const config = {
        headers: {
          token: user.data.token
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/chat/rmToGC`,
        {
          ChatID: SelectedChat._id,
          userId: user.data._id
        },
        config
      );
      setSelectedChat();
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setgroupChatName("");

  }

  const handleRemove = async (user1) => {
    if (SelectedChat.groupAdmin._id !== user.data.userId && user1._id !== user.data._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
    const config = {
      headers: {
        token: user.data.token
      },
    };
      const { data } = await axios.post(
        `http://localhost:5000/chat/rmToGC`,
      {
        ChatID: SelectedChat._id,
        userId: user1._id,
      },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    //   fetchMessages();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setgroupChatName("");
  }
  const handleAddUser = async (user1) => {
        if (SelectedChat.groupAdmin._id !== user.data.userId) {
            toast({
                title: "Only admins can add someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (SelectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User already added",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });
        }
             try {
    setLoading(true);
    const config = {
      headers: {
        token: user.data.token
      },
    };
    
    const { data } = await axios.post(
      `http://localhost:5000/chat/addToGC`,
      {
        ChatID: SelectedChat._id,
        userId: user1._id,
      },
      config
    );
    
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
      setSearch("");
    
  } catch (error) {
            console.error("FULL ERROR:", error);
            console.error("Error type:", typeof error);
            console.error("Error message:", error.message);
            console.error("Error response:", error.response?.data);
      toast({
        title: "Error Occured!",
        // description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setgroupChatName("");
  }
    const handleRename = async () => {
        if (!groupChatName) return
        try {
            setRenameLoading(true);
            const config = {
                headers: {
                    token: user.data.token,
                }
            };
            const res = await axios.post(
                `http://localhost:5000/chat/reNameGC`,
                {
                    chatID: SelectedChat._id,
                    chatName: groupChatName,
                },
                config
            );
            setSelectedChat(res.data.data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            console.error("FULL ERROR:", error);
            console.error("Error type:", typeof error);
            console.error("Error message:", error.message);
            console.error("Error response:", error.response?.data);
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
            setRenameLoading(false);
        }
        setgroupChatName("");
    };
    const handleSearch = async (query) => {
        setSearch(query)
        if (!query) {
            return
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    token: user.data.token
                }
            }

            const { data } = await axios.get(`http://localhost:5000/user/allUsers?keyword=${search}`, config)
            console.log(data)
            setLoading(false)
            setSearchResult(data.data)
        } catch (error) {
            toast({
                title: "Req failed",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })
        }
    }
    console.log("SelectedChat:", SelectedChat);
    
    return (
        <>
            <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize='30px'
                        fontFamily='Work sans'
                        textAlign='center'
                        d='flex'
                        justifyContent='center'
                    >{SelectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box w="100%" display='flex' flexWrap='wrap' pb={3}>
                            {(SelectedChat && Array.isArray(SelectedChat.users)) ? (
                                SelectedChat.users.map((u) => (
                                    <UserbadgeItem key={u._id} user={u} handleFunction={() => handleRemove(u)} />
                                ))
                            ) : null}
                        </Box>
                        <FormControl display={'flex'} flexDirection='row'>
                            <Input
                                placeholder='Chat Name'
                                mb={3}
                                value={groupChatName}
                                onChange={(e) => setgroupChatName(e.target.value)}
                            />
                            <Button
                                variant='solid'
                                colorScheme='teal'
                                ml={1}
                                isLoading={renameLoading}
                                onClick={handleRename}
                            >
                                Update
                            </Button>
                        </FormControl>
                        <FormControl display={'flex'} flexDirection='row'>
                            <Input
                                placeholder='Add User to Group'
                                mb={3}
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        {loading ? (
                            <Spinner size="lg" />
                        ) : (
                            searchResult?.slice(0, 4).map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleAddUser(user)}
                                />
                            ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => { handleLeave(user) }}>
                            Remove
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateGroupChatModal;
