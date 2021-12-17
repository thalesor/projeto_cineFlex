import React from 'react';
import Navbar from './components/Navbar';
import Movies from './components/MovieScreen';
import Seasons from './components/MovieSeasonsScreen';
import Seats from './components/MovieSeatScreen.js';
import Success from './components/SuccessScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App()
{
    return(
        <div className="root">
        <BrowserRouter>
            <Navbar/>
            <div className='main'>
            <Routes>
                <Route path="/" element={<Movies />}></Route>
                <Route path="/sessoes/:idFilme" element={<Seasons />}></Route>
                <Route path="/assentos/:idSessao" element={<Seats />}></Route>
                <Route path="/success" element={<Success />}></Route> 
            </Routes>
            </div>
          </BrowserRouter>
      </div>
    );
}

export default App;