import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieScreen = () =>
{
    const [movies, setMovies] = useState([]);

    const getMovies = () =>
    {
        axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies`)
        .then(response => {
        setMovies([...response.data]);
        console.log(response.data);
        })
    }

    useEffect(() => {
        getMovies();
    }, [])

    const MovieCard = ({movieData}) => 
    {
        return(
            <div className='movie-card'>
                <img src={movieData.posterURL} />
            </div>
        );
    }

    return(
        <div className='movies-container'>
            <h3>Selecione o filme</h3>
            <div className='movies-list'>
            {
                movies.map((movie, i) => 
                {
                    return (
                        <MovieCard key={i} movieData={movie} />
                );
                })
            }
            </div>
        </div>
    );
}

export default MovieScreen;