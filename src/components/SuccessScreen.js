import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './MovieCard';

const SuccessScreen = () => 
    {
        const { state } = useLocation();
        const { orderData } = state;
        const navigate = useNavigate();

        console.log(orderData)
        return(
            <div className='container'>
                <h3 className='container-title text-green'>Pedido feito com sucesso!</h3>
                    <div className='success-container'>

                        <Card movieData={orderData.movie} />

                        <div className='success-block'>
                            <strong>Filme e sessão</strong>
                            <span>{orderData.movie.title}</span>
                            <span>{orderData.date} - {orderData.time}</span>
                        </div>

                        <div className='success-block'>
                            <strong>Ingressos</strong>
                            {
                                 orderData.seats.map((seat, i) => 
                                 {
                                     return (
                                     <span>Assento {seat}</span>
                                 );
                                 })
                            }
                        </div>

                        <div className='success-block'>
                            <strong>Comprador:</strong>
                            <span>Nome: {orderData.buyer}</span>
                            <span>CPF: {orderData.cpf}</span>
                        </div>
                        <a onClick={()=> navigate('/')}>Voltar pra Home</a>
                    </div>
            </div>
        );
    }

export default SuccessScreen;