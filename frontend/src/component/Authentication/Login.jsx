import React from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack ,useToast} from '@chakra-ui/react'
import { useState } from 'react';
import axios from "axios"
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  const toast = useToast()

 

  const submitHandler = async () =>{
    setLoading(true)
    if(!email || !password){
      toast({
        title:"please Fill all the Feilds",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom"
    })
    setLoading(false)
    return
    }
  try{
      const config = {
          headers:{
              "Content-type": "multipart/form-data"
          }
      }
  const pdata = new FormData()
  pdata.append("email",email)
  pdata.append("password",password)
  
  const {data} = await axios.post("/user/login",pdata,config) 
  toast({
      title:"Registeration Sucessful",
      status:"sucess",
      duration:5000,
      isClosable:true,
      position:"bottom"
  })

  localStorage.setItem("UserIfo" , JSON.stringify(data))
  setLoading(false)
  history.push("/chat")
  } catch (error){
      toast({
          title:"Error Occured",
          description: error.response.data.message,
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom"
      }) 
      setLoading(false)
  }



  }

  const handleClick = () => setShow(!show)
return (
 <VStack spacing={"5px"}>
      
      <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder='Enter Your Email' value={email} onChange={(e)=>setemail(e.target.value)}/>
      </FormControl>
      <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
          <Input type={show?"text":"password"} value={password} placeholder='Enter your  Password' onChange={(e)=>setPassword(e.target.value)}/>
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
      onClick={submitHandler}
      isLoading={loading}>
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
