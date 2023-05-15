const express = require('express');
const dotenv=require("dotenv")
const app = express();
const connectDB=require('./config/database')
const {registerUser,authUser,getAllUsers}=require('./controllers/registeration')
const {accessChat,fetchChats,createGroupChat,renameGroup,removeFromGroup,addToGroup}=require('./controllers/chatControllers')
const {sendMessage,allMessages}=require('./controllers/messageControllers')
const {protect}=require('./middleware/authMiddleware')
dotenv.config()

connectDB();

const PORT=process.env.PORT||5000
app.use(express.json()) // to work with json data


app.route('/login').post(authUser)
app.route('/user').get(protect, getAllUsers).post(registerUser)
app.route('/chats').post(protect,accessChat).get(protect,fetchChats)
app.route('/group').post(protect,createGroupChat)
app.route('/message').post(protect,sendMessage)
app.route('/message/:chatId').get(protect,allMessages)




const server = app.listen(PORT, console.log("server started"))


const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
  //  console.log("Connected to socket.io");
    socket.on("setup",(userData)=>{
        socket.join(userData._id)
        socket.emit('connected')
    })
    socket.on('join chat',(room)=>{
        socket.join(room)
      //  console.log("user joined room: "+room)
    })

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });
    });