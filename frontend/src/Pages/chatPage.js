 import React, { useEffect, useState } from 'react'
import {ChatState} from "../components/Context/ChatProvider";
import {Box} from "@chakra-ui/layout";
import SideDrawer from "../components/misc/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {

  const {user} = ChatState();
  const [fetchAgain, setFetchAgain] =useState(false)

  return (
    <div style={{width:"100%"}}>
        { user && <SideDrawer/>}
        <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
            {user && (<MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>)}
            {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
        </Box>
        

    </div>
  )
}

export default ChatPage

// import axios from 'axios'
// import { json } from 'react-router-dom';
// import {Link} from 'react-router-dom';


// const ChatPage = () => {
//         console.log("inside to aagya")

//         useEffect(()=>{
//         fetchChats();
//         },[])

//         const [chats, setChats ] = useState([]);

//         const fetchChats = async ()=>{
//         console.log("hi")
//         const data = await fetch("/chats")
//         console.log(data)
//         const chats = await data.json();
        
//         setChats(chats);
//     }   

//     return (

//         <section>
//             {
//                 chats.map( val => (
//                     <div>
//                         <p key="{val}">(val)</p>
//                     </div>
//                 ))
//             }
//         </section>
//     )
// }

//export default ChatPage;