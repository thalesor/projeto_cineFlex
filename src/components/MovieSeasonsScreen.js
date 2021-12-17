import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import Loading from './LoadingScreen';

const MovieSeasonsScreen = () =>
{
    const { idFilme } = useParams();
    const [season,setSeason] = useState({});
    
    const getSeasons = () =>
    {
        axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilme}/showtimes`)
        .then(response => {
        setSeason({
            'movie': {
                'title': response.data.title,
                'posterURL': response.data.posterURL,
                'id': response.data.id
            },
            'days': response.data.days
        });
        })
    }

    useEffect(() => {
        getSeasons();
    }, [])

    return(
        season.movie && season.days ?
        <>
        <div className='container'>
            <h3 className='container-title'>Selecione o horário</h3>
            <div className='seasons-list'>
            {
                
                season?.days?.map((day, i) => 
                {
                    return (
                        <>
                            <span>{day.weekday} - {day.date}</span>
                            <ul>
                            {
                                day.showtimes.map((time, i) => 
                                {
                                    return (
                                        <>
                                            <li key={i}><Link to={`/assentos/${time.id}`}>
                                                <button>{time.name}</button>
                                            </Link></li>
                                        </>
                                );
                                })
                            }
                            </ul>
                        </>
                );
                })
                
            }
            </div>
        </div>
        <Footer movieData={season}/>
        </>
        :
        <Loading />
    );
}

export default MovieSeasonsScreen;