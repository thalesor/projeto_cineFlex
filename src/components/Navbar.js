import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () =>
{
    const navigate = useNavigate();
    const location = useLocation();
    return(
        <header>
            <div className='header-container'>
                {location.pathname !== '/' ? <button onClick={()=> navigate(-1)}>Voltar</button> : ''}
                 <h1>CINEFLEX</h1>
            </div>
        </header>
    );
}

export default Navbar;