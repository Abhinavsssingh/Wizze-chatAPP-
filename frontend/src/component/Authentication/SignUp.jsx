import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack , useToast} from '@chakra-ui/react'
import axios from "axios"
import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

  function SignUp() {
    const toast = useToast()
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [confirmpassword, setconfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [loading, setPicLoading] = useState(false);
    const [pic, setPic] = useState();
    const [show, setShow] = useState(false);
    const history = useHistory()

    

   const  HandleImage = (pic) => {
    try{
            console.log(pic)
            setPicLoading(true);
            if (pic === undefined) {
              toast({
                title: "Please Select an Image1!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              return;
            }
            console.log(pic);
            if (pic.type === "image/jpeg" || pic.type === "image/png") {
              const data = new FormData();
              data.append("file", pic);
              data.append("upload_preset", "Chat-App");
              data.append("cloud_name", "dpuvmjfnp");
              fetch("https://api.cloudinary.com/v1_1/dpuvmjfnp/image/upload", {
                method: "post",
                body: data,
              })
                .then((res) => res.json())
                .then((data) => {
                  setPic(data.url.toString());
                  console.log(data.url.toString());
                  setPicLoading(false);
                })
                .catch((err) => {
                  console.log(err);
                  setPicLoading(false);
                });
            } else {
              toast({
                title: "Please Select an 2!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              setPicLoading(false);
              return;
            }
        }catch(error){
            console.log(error)
        }
          
    }

    const submitHandler = async () =>{
        setPicLoading(true)
        if(!name || !email || !password || !confirmpassword) {
            toast({
                title:"please Fill all the Feilds",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
            setPicLoading(false)
            return
        }
        if (password!==confirmpassword) {
            toast({
                title:"password doesnt match",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
            setPicLoading(false)
            return
        }
        try{
            const config = {
                headers:{
                    "Content-type": "multipart/form-data"
                }
            }
        const pdata = new FormData()
        pdata.append("name",name)
        pdata.append("email",email)
        pdata.append("password",password)
        if(pic){
            pdata.append("Files",pic)
        }
        const {data} = await axios.post("/user/register",pdata,config) 
        toast({
            title:"Registeration Sucessful",
            status:"sucess",
            duration:5000,
            isClosable:true,
            position:"bottom"
        })

        localStorage.setItem("UserIfo" , JSON.stringify(data))
        setPicLoading(false)
        history.push("/chat")
        } catch (error){
            toast({
                title:"Error Occured1",
                description: error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            }) 
            setPicLoading(false)
        }
    }

   

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
            <Input type={"File"} p={1.5} accept="image/*" placeholder='Jpeg/png' onChange={(e) => HandleImage(e.target.files[0])}/>
        </FormControl>

        <Button
        colorScheme="purple"
        width={"100%"}
        style={{marginTop:15}}
        onClick={submitHandler}
        isLoading={loading}>
           Sign Up
        </Button>
   </VStack>
  )
}

export default SignUp
