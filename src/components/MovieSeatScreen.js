import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';

const MovieSeatScreen = () =>
{
    const { idSessao } = useParams();
    const [seatsData,setSeatsData] = useState({});

    const getSeats = () =>
    {
        axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`)
        .then(response => {
            setSeatsData({
                ...response.data
            });
            console.log(response.data)
        })
    }

    useEffect(() => {
        getSeats();
    }, [])

    return(
        seatsData.movie !== undefined ?
        <>
        <div className='container'>
            <h3 className='container-title'>Selecione o(s) assento(s)</h3>
            <div className='seats-list'>
            {
                seatsData.seats ?
                seatsData.seats.map((seat, i) => 
                {
                    const buttonType = seat.isAvailable ? 'available' : 'unavailable';
                    return (
                        <button className={buttonType}>{seat.name}</button>
                    );
                })
            :
            'carregando assentos'
            }
            </div>
            <form>
               <div className='form-group'><span>Nome do comprador:</span><input type="text" onChange={'a'} placeholder='Digite seu nome...' required/></div> 
               <div className='form-group'><span>CPF do comprador</span><input type="text" onChange={'a'} placeholder='Digite seu CPF...' required/></div> 
            
                <input type="submit" value='Reservar assento(s)'></input>
            </form>
        </div>
        <Footer movieData={seatsData}/>
        </>
        :
        'Carregando a página'
    );
}

export default MovieSeatScreen;