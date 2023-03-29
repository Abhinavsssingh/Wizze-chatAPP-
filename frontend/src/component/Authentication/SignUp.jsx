import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

import React from 'react'
import { useState } from 'react';

function SignUp() {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [confirmpassword, setconfirmpassword] = useState();
    const [password, setPassword] = useState();
    // const [pic, setPic] = useState();
    const [show, setShow] = useState(false);

    const postDetails = () =>{}

    const submitHandler = () =>{}

    const handleClick = () => setShow(!show)
  return (
   <VStack spacing={"5px"}>
        <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter Your Name' onChange={(e)=>setname(e.target.value)}/>
        </FormControl>
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your Email' onChange={(e)=>setemail(e.target.value)}/>
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input type={show?"text":"password"} placeholder='Enter Strong Password' onChange={(e)=>setPassword(e.target.value)}/>
            <InputRightElement>
               <Button h ="1.75rem" size="sm" onClick={handleClick}>
                    {show? "Hide": "Show"}
               </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="confirmpassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
            <Input type={show?"text":"password"} placeholder='Enter Strong Password' onChange={(e)=>setconfirmpassword(e.target.value)}/>
            </InputGroup>
        </FormControl>
        <FormControl id="pic" isRequired>
            <FormLabel>Profile pic</FormLabel>
            <Input type={"File"} p={1.5} accept="image/" placeholder='Jpeg/png' onChange={(e)=>postDetails(e.target.files[0])}/>
        </FormControl>

        <Button
        colorScheme="purple"
        width={"100%"}
        style={{marginTop:15}}
        onClick={submitHandler}>
           Sign Up
        </Button>
   </VStack>
  )
}

export default SignUp
