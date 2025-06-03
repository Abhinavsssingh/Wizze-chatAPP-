import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    useToast,
    Center,
    FormControl,
    Input,
    Box
  } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import UserListItem from '../userAvatar/UserListItem'
import UserbadgeItem from '../userAvatar/UserbadgeItem'

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const  [selectUsers, setSelectUsers] = useState([])
    const  [groupchatName, setGroupChatName] = useState([])
    const  [search, setSearch] = useState("")
    const  [searchResult, setsearchResult] = useState([])
    const  [loading, setLoading] = useState(false)

    const  toast = useToast()

    const {user,chats,setChats} = ChatState()

    const handleSearch = async (query) => {
        setSearch(query)
        if(!query) {
            return
        }

        try {
            setLoading(true)

            const config = {
                headers:{
                    token: user.data.token
                }
            }

            const{data} = await axios.get(`http://localhost:5000/user/allUsers?keyword=${search}`,config)
            console.log(data)
            setLoading(false)
            setsearchResult(data.data)
        } catch (error) {
            toast({
                title:"Req failed",
                status: "error",
                duration:5000,
                isClosable:true,
                position:'bottom-left'
              })
            }
        }
    
    const handleSubmit = async() => {
        if(!groupchatName || !selectUsers){
            toast({
                title:"Please Add Required Details",
                status: "error",
                duration:5000,
                isClosable:true,
                position:'bottom-left'
              })
              return
        }
        try {
            const config = {
                headers:{
                    token: user.data.token
                }
            }

            const {data} = await axios.post(`http://localhost:5000/chat/CreateGroupChat`,
            {
                chatName:groupchatName,
                users: JSON.stringify(selectUsers.map((u)=>u._id))
            },
            config)

            setChats([data.data,...chats])
            onClose()
            toast({
                title:"New Grop chat created",
                status: "success",
                duration:5000,
                isClosable:true,
                position:'bottom'
              })

        } catch (error) {
            console.log(error.message)
            toast({
                title:"Group chat not created ",
                status: "error",
                duration:5000,
                isClosable:true,
                position:'bottom-left'
              })
            }
        }
    
    const handleGroup = (user) => {
        if(selectUsers.includes(user)){
            toast({
                title:"User Already added",
                status: "error",
                duration:5000,
                isClosable:true,
                position:'bottom-left'
              })
              return
            }
            setSelectUsers([...selectUsers,user])
        }

    const handleDelete = (deluser) => {
        setSelectUsers(selectUsers.filter(x=> x._id!=deluser._id))
    }
    
    

    
    
    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              display="flex"
              justifyContent="center">Create Group Chat</ModalHeader>
              <ModalCloseButton />
              <ModalBody display="flex" flexDir={"column"} alignItems="center">
                <FormControl>
                    <Input placeholder='Chat Name' mb={3} onChange={(e)=> setGroupChatName(e.target.value)}/>
                </FormControl>
                <FormControl>
                    <Input placeholder='Add Users' mb={1} onChange={(e)=> handleSearch(e.target.value)}/>
                </FormControl>
                <Box width="100%" display="flex" flexWrap="wrap">

                {selectUsers.map(u=>(
                    <UserbadgeItem key={u._id} user={u} handleFunction={()=>handleDelete(u)}/>
                    ))}
                {loading?<div>loading</div> :(
                    searchResult?.slice(0,4).map(user => (
                        <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)} />
                        ))
                        )}
                </Box>
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                  Create Chat
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
    
}

export default GroupChatModal
