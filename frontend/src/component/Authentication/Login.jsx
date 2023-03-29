import React from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useState } from 'react';

function Login() {
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

 

  const submitHandler = () =>{}

  const handleClick = () => setShow(!show)
return (
 <VStack spacing={"5px"}>
      
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
      

      <Button
      colorScheme="purple"
      width={"100%"}
      style={{marginTop:15}}
      onClick={submitHandler}>
         Login
      </Button>

      <Button
      variant="solid"
      colorScheme="pink"
      width={"100%"}
      onClick={()=>{
        setemail("guest@exm.com")
        setPassword("123456")
      }}>
        Get Guest Credentials
      </Button>
 </VStack>
)
}

export default Login
