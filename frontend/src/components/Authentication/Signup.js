import { Button } from "@chakra-ui/button";
import {FormControl,FormLabel} from "@chakra-ui/form-control"
import {Input,InputGroup,InputRightElement} from "@chakra-ui/input"
import {VStack} from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import React,{useState} from 'react'; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [show,setShow]=useState(false) 
  const [name,setName]=useState()
  const [contact,setContact]=useState()
  const [confirmpassword,setConfirmpassword]=useState()
  const [password,setPassword]=useState()
  const [pic,setPic]=useState()
  const [picLoading, setPicLoading] = useState(false);
  const toast=useToast();
  const navigate = useNavigate();
  
  const handleClick=()=>{setShow(!show)}  //password hide or show button
  
  const postDetails=(pics)=>{     //image uploading
    setPicLoading(true);
    if(pics===undefined){
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if(pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "messaging-application");
      data.append("cloud_name", "dijugosnv");
      fetch("https://api.cloudinary.com/v1_1/dijugosnv/image/upload", {
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
          console.log("errorrr")
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

  }
  const submitHandler = async()=>{
    setPicLoading(true);
    if (!name || !contact || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, contact, password, pic);
    try {   
      const { data } = await axios.post( "/user",
        {name,contact,password,pic
        });
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
    }

  return <VStack spacing='5px'>
    <FormControl id="userName" isRequired>
        <FormLabel>User Name</FormLabel>
        <Input 
         placeholder='Enter Your User Name'
         onChange={(event)=>{setName(event.target.value)
         }}
         /> 
    </FormControl>
    <FormControl id="contact" isRequired>
        <FormLabel>Contact No.</FormLabel>
        <Input 
         placeholder='Enter Your Contact No'
         onChange={(event)=>{setContact(event.target.value)
         }}
         /> 
    </FormControl>
    <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input 
            type={show?"text":"password"}
            placeholder='Enter Your Password'
            onChange={(event)=>{setPassword(event.target.value)
            }}
           />
           <InputRightElement width="4.5rem">
              <Button h="1.75trem" size="sm" onClick={handleClick}>
                {show ? "Hide":"Show"}
              </Button>
           </InputRightElement>
        </InputGroup>       
    </FormControl>
    <FormControl id="cpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input 
            type={show?"text":"password"}
            placeholder="Confirm Password"
            onChange={(event)=>{setConfirmpassword(event.target.value)
            }}
           />
           <InputRightElement width="4.5rem">
              <Button h="1.75trem" size="sm" onClick={handleClick}>
                {show ? "Hide":"Show"}
              </Button>
           </InputRightElement>
        </InputGroup>       
    </FormControl>
    <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/"
          onChange={(event)=>postDetails(event.target.files[0])}
          />
    </FormControl>
    <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    
  </VStack>
}


export default Signup