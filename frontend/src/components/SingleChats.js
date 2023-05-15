import React from 'react';
import { useEffect, useState } from "react";
import { ChatState } from './Context/ChatProvider'
import { Box, Text  } from '@chakra-ui/react'
import { getSender } from '../config/chatLogic'
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import axios from 'axios';
import ScrollableChat from "./ScrollableChat"
import './styles.css'

import io from "socket.io-client"

const ENDPOINT = "http://localhost:5000"
var socket,selectedChatCompare;

const SingleChats = ({fetchAgain, setFetchAgain}) => {

  useEffect(()=>{
    socket=io(ENDPOINT)
    socket.emit('setup',(user))
    socket.on('connection',()=>setSocketConnected(true))
  })
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected,setSocketConnected]=useState(false)
    const{ user , selectedChat , setSelectedChat} = ChatState()
    const toast = useToast();

    
    const fetchMessages = async () => {
      
      if (!selectedChat) return;
  
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
  
        setLoading(true);
  
        const { data } = await axios.get(
          `/message/${selectedChat._id}`,
          config
        );
        setMessages(data);
        setLoading(false);
        socket.emit('join chat',selectedChat._id);
        
  
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Messages",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    };

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
          try {
            const options = {
                method: "POST",
                headers: {
                    'Content-type': "application/json"  ,
                     Authorization: `Bearer ${user.token}`,
                    },
                body:JSON.stringify({
                  content: newMessage,
                  chatId: selectedChat._id,
                })
                
              };
              setNewMessage("");
             fetch('/message', options)
            .then((res)=>{
              
              return res.json()
            })
            .then((data)=>{
              console.log(data)
              socket.emit("new message",data)
              setMessages([...messages, data]);
            })
            .catch(()=>
            {
              console.log("Error")
            })
           
            
          } catch (error) {
            toast({
              title: "Error Occured!",
              description: "Failed to send the Message",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
        }
      };
      
      

      const typingHandler= async (event)=>{
        setNewMessage(event.target.value)
      }
    
      useEffect(() => {
        fetchMessages();
        selectedChatCompare=selectedChat;  // jst to check if we have to emit the message
      }, [selectedChat]);

      useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
          if (
            !selectedChatCompare || // if chat is not selected or doesn't match current chat
            selectedChatCompare._id !== newMessageRecieved.chat._id
          ) {
            //
          } else {
            setMessages([...messages, newMessageRecieved]);
          }
        });
      });


    
  return ( 
  <>
  {selectedChat?(
    <>
        <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages && !selectedChat.isGroupChat?(
                <>
                  {getSender(user, selectedChat.users)}
                </>
            ):(
                <>
                {selectedChat.chatName.toUpperCase()}
                </>
            )}


          </Text>
          <Box display="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#E8E8E8" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
          {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
              // <></>
              
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
             
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          
          </Box>

    </>
  ):(
    <Box display="flex" alignItems="center" justifyContent="center" h="100%">
    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
       start chat
    </Text>
  </Box>
  )}

  </>
 )
}

export default SingleChats;