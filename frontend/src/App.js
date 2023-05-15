
// export default App;
import React, { useEffect, useState } from 'react'
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './Pages/chatPage'
import Home from './Pages/homePage'

function App() {

  return (
   
    <div className="App">    
        <Routes>
          <Route path="/" element={<Home />} exact/>
          <Route path="/chats" element={<ChatPage />}/>
        </Routes>
    </div>
  
  );
}

export default App;