// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import {BrowserRouter} from 'react-router-dom'

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  //   <React.StrictMode>
  //     <BrowserRouter>
  //       <ChakraProvider>
  //         <App />
  
  //       </ChakraProvider>
  //     </BrowserRouter>     
  //   </React.StrictMode>
  // );
  
  import React, { StrictMode } from 'react';
  import ReactDOM from 'react-dom/client';
  import './index.css';
  import App from './App';
  import { BrowserRouter, Routes } from 'react-router-dom';
  import { ChakraProvider } from '@chakra-ui/react' 
  import ChatProvider from '../src/components/Context/ChatProvider'
  
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter><ChatProvider>
  <ChakraProvider>
      <App />    
  </ChakraProvider>
</ChatProvider></BrowserRouter>
  

);
