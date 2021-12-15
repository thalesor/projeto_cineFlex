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
        </div>
        <Footer movieData={seatsData}/>
        </>
        :
        'Carregando a porra toda'
    );
}

export default MovieSeatScreen;