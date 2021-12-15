import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Movies from './components/MovieScreen';

function App()
{
  
    return(
        <div className="root">
          <Navbar/>
          <div className='main'>
              <Movies />
          </div>
      </div>
    );
}

export default App;