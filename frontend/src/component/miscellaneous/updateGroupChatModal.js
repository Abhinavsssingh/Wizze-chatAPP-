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
    Box
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';
import { useToast } from '@chakra-ui/react';
import UserbadgeItem from '../userAvatar/UserbadgeItem';
import UserListItem from '../userAvatar/UserListItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setgroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const { user, SelectedChat, setSelectedChat } = ChatState();
    const toast = useToast();

    const handleRemove = () => { }
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
                        <Box>
                            {(SelectedChat && Array.isArray(SelectedChat.users)) ? (
                                SelectedChat.users.map((u) => (
                                    <UserbadgeItem key={u._id} user={u} handleFunction={() => handleRemove(u)} />
                                ))
                            ) : null}
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateGroupChatModal;
