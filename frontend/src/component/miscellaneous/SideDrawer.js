import { Avatar, Box, Button, Center,Drawer, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,Input, Toast, useToast, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import Profile from './Profile'
import ChatLoading from './ChatLoading'
import UserListItem from '../userAvatar/UserListItem'
import { useHistory } from 'react-router-dom'
import { useDisclosure } from '@chakra-ui/react'
import axios from "axios"



const SideDrawer = () => {
  const [search,setSearch] = useState("")
  const [searchResult,setsearchResult] = useState([])
  const [loading,setLoading] = useState(false)
  const [loadingChat,setLoadingChat] = useState(false);
  
  const{user,setSelectedChat,chats, setChats} = ChatState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // console.log(user)

  const history = useHistory()

  const logoutHandler = () => {
    localStorage.removeItem("UserInfo")
    history.push("/")
  }

  const toast = useToast()

  const accessChat = async(userId) => {
      //  console.log(userId)
       try{
        setLoadingChat(true)
        const config = {
          headers: {
            "Content-type": "application/json",
            token:user.data.token
          }
        }
        const{data} = await axios.post("http://localhost:5000/chat/getChat",{userId:userId},config)

        if(!chats.find((c)=>c._id===data._id)) setChats([data,...chats])
        setSelectedChat(data)
        setLoadingChat(false)
        onClose()

       }catch(error){
        toast({
          title:"Req failed",
          status: "error",
          duration:5000,
          isClosable:true,
          position:'bottom-left'
        })
       }
  }

  const handleSearch = async() => {
    if(!search) {toast({
      title:"Please enter something in search",
      status: "warning",
      duration:5000,
      isClosable:true,
      position:'top-left'
    })
    return
  }
    try{
      // console.log(search)
      setLoading(true)
      const config = {
        headers: {
          token:user.data.token
        }
      }
      // console.log(config)
      const{data} = await axios.get(`http://localhost:5000/user/allUsers?keyword=${search}`,config)
      // data = data.data
      setLoading(false)
      setsearchResult(data)
    }catch(err){
      toast({
        title:"Req failed",
        status: "error",
        duration:5000,
        isClosable:true,
        position:'bottom-left'
      })
    }
  }


  

  return (
    <>
      <Box display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px">
        <Tooltip label="Search Users to Chat"
        hasArrow
        placement='bottom-end'>
            <Button variant='ghost' onClick={onOpen}>
             <Text display={{base:"none",md:"flex"}} px='4'>Search User</Text>
             <i class="fa-brands fa-searchengin" style={{ fontSize: '30px' }}></i>
            </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">Wizee</Text>
        <div>
            <Menu>
                <MenuButton p={1}>
                 <i class="fa-regular fa-bell"
                 fontSize="2xl"
                 m={1}></i>
                </MenuButton>
            </Menu>
            <Menu>
                <MenuButton as={Button} rightIcon={<i class="fa-solid fa-chevron-down"></i>}>
                 <Avatar size="sm" cursor="pointer" name={user.data.name} src={user.data.pic}/>
                </MenuButton>
                <MenuList>
                    <Profile user={user}>
                    <MenuItem>My Profile</MenuItem>
                    </Profile>
                    <MenuDivider/>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </div>
      </Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>
          <DrawerBody>
            <Box display="flex" paddingBottom={2}>
              <Input placeholder={"Search by name or email"}
              mr={2}
              value={search}
              onChange={(e)=> setSearch(e.target.value)}>
              </Input>
              <Button onClick={handleSearch}>Go</Button>

            </Box>
            {loading?(
              <ChatLoading/>
            ):(searchResult.data?.map(user => (
              <UserListItem
              key={user._id}
              user={user}
              handleFunction={()=>accessChat(user._id)}/>
            )))}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer
