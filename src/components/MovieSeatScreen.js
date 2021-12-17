import React, { useState, useEffect, useRef } from 'react';
import Snackbar from "./Snackbar/Snackbar";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import Loading from './LoadingScreen';

const MovieSeatScreen = () =>
{
    const { idSessao } = useParams();
    const [seatsData,setSeatsData] = useState({});
    const [seatsList, setSeatsList] = useState([]);
    const [buyerName, setBuyerName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const snackbarRef = useRef(null);
    const [buyerCPF, setBuyerCPF] = useState('');
    let navigate = useNavigate();
    
    const SeatButton = ({type, name, isAvailable}) =>
    {
        return (
            isAvailable 
            ?
            <button onClick={()=> toggleStatusOfSeat(name)} className={type}>{name}</button>
            :
            <button onClick={()=> toggleStatusOfSeat(name)} className='unavailable'>{name}</button>
        );
    }

    const Legend = ({color, message}) =>
    {
        return (
            <div className='legend'>
                <div className={`legend-color ${color}`}/>
                <span>{message}</span>
            </div>
        );
    }

    const displayError = (message) =>
    {
         setErrorMsg(message);
         snackbarRef.current.show();
    }

    const onInsertOrder = (event) => {
        event.preventDefault();
        const selected = seatsList.filter(seat => seat.selected);
        if(!selected.length)
        alert('Precisa selecionar pelo menos um assento!');
        else
        {
            let orderData = {};
            orderData.movie = seatsData.movie;
            orderData.time = seatsData.name;
            orderData.date = seatsData.day.date;
            orderData.buyer = buyerName;
            orderData.cpf = buyerCPF;
            const selected = seatsList.filter(seat => seat.selected);
            orderData.ids = [];
            orderData.seats = [];
            selected.forEach(s=> orderData.ids.push(s.id));
            selected.forEach(s=> orderData.seats.push(s.name));
            axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`, 
            {
                ids:  orderData.ids,
                name: orderData.buyer,
                cpf:  orderData.cpf
            })
            .then(response => {
                navigate("/success", { state: { orderData: orderData } }); 
            }).catch(() => displayError("Erro no servidor ao tentar fazer o pedido!"));
        }
      };

    const onUpdateBuyerName = (evt) =>
    {
     setBuyerName(evt.target.value);
    }

    const onUpdateBuyerCPF = (evt) =>
    {
     setBuyerCPF(evt.target.value);
    }

    const getSeats = () =>
    {
        axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`)
        .then(response => {
            setSeatsData({
                ...response.data
            });
            let  arrayOfSeats = [];
            response.data.seats.forEach(sit => {
                let seat = {name: sit.name, isAvailable: sit.isAvailable, selected: false, id: sit.id};
                arrayOfSeats.push(seat);
            });
            setSeatsList([...arrayOfSeats]);
        })
    }

    const toggleStatusOfSeat = (name) =>
    {
        const newArraySeats = [...seatsList];
        let selectedSeat = newArraySeats.find(seat => seat.name === name);
        if(selectedSeat.isAvailable)
        {
            selectedSeat.selected = selectedSeat.selected === true ? false : true;
            setSeatsList([...newArraySeats]);
        }
        else
        alert('Esse assento não está disponível');
    }

    useEffect(() => {
        getSeats();
    }, [])

    return(
        seatsData.movie !== undefined ?
        <>
        <div className='container'>
            <h3 className='container-title'>Selecione o(s) assento(s)</h3>
            <ul className='seats-list'>
            {
                seatsData.seats ?
                seatsList.map((seat, i) => 
                {
                    return (
                        <li key={i}><SeatButton key={i} name={seat.name} isAvailable={seat.isAvailable} type={seat.selected ? 'selected' : 'available'}/></li>
                    );
                })
            :
            <Loading />
            }
            </ul>
            <div className='legends-container'>
                <Legend color="selected" message="Selecionado"/>
                <Legend color="available" message="Disponível"/>
                <Legend color="unavailable"  message="Indisponível"/>
            </div>
            <form onSubmit={onInsertOrder}>
               <div className='form-group'><span>Nome do comprador:</span><input type="text" onChange={onUpdateBuyerName} placeholder='Digite seu nome...' required/></div> 
               <div className='form-group'><span>CPF do comprador</span><input type="text" onChange={onUpdateBuyerCPF} placeholder='Digite seu CPF...' required/></div> 
                <button >Reservar assento(s)</button>
            </form>
        </div>
        <Footer movieData={seatsData}/>
        <Snackbar
           ref={snackbarRef}
           message={errorMsg}
           />
        </>
        :
        <Loading />
    );
}

export default MovieSeatScreen;