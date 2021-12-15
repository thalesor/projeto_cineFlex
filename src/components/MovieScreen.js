import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from './MovieCard';

const MovieScreen = () =>
{
    const [movies, setMovies] = useState([]);

    const getMovies = () =>
    {
        axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies`)
        .then(response => {
        setMovies([...response.data]);
        })
    }

    useEffect(() => {
        getMovies();
    }, [])

    return(
        <div className='container'>
            <h3 className='container-title'>Selecione o filme</h3>
            <div className='movies-list'>
            {
                movies.map((movie, i) => 
                {
                    return (
                        <Link to={`/sessoes/${movie.id}`}>
                            <Card key={i} movieData={movie} />
                        </Link>
                );
                })
            }
            </div>
        </div>
    );
}

export default MovieScreen;