import { Avatar, Box, Button, Center, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import Profile from './Profile'
import { useHistory } from 'react-router-dom'

const SideDrawer = () => {
  const [search,setSearch] = useState("")
  const [searchResult,setsearchResult] = useState([])
  const [loading,setLoading] = useState(false)
  const [loadingChat,setLoadingChat] = useState();

  const{user} = ChatState()
  console.log(user)

  const history = useHistory()

  const logoutHandler = () => {
    localStorage.removeItem("UserInfo")
    history.push("/")
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
            <Button variant='ghost'>
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
    </>
  )
}

export default SideDrawer
