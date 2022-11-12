// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SignUpHome } from './signup';
import {SignIn} from './signin'

function App() {
  return (
    <div>
      
     <BrowserRouter>
          <Routes>
            <Route path='/' element={<SignUpHome />} />
             <Route path='/SignIn' element={ <SignIn/>} /> 
           

          </Routes>
        </BrowserRouter>  
    </div>
  );
}

export default App;
