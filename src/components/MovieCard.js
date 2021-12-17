const MovieCard = ({movieData}) => 
    {
        return(
            <div className='movie-card animate__animated animate__slideInUp'>
                <img src={movieData.posterURL} />
            </div>
        );
    }

export default MovieCard;