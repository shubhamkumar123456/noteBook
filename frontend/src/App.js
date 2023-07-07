
import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
// import { BrowserRouter,Route,Router,Link } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './components/context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setalert] = useState(null);
  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null)
    },1500);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">



            <Routes>

              <Route exact path='/' element={<Home showAlert={showAlert}/>} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
              <Route exact path='/signup' element={<Signup showAlert={showAlert}/>} />

              {/* <Route path='/users' element={ <Users/>}/> */}




            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>

    </>
  );
}

export default App;
