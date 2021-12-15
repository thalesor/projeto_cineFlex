const MovieCard = ({movieData}) => 
    {
        return(
            <div className='movie-card'>
                <img src={movieData.posterURL} />
            </div>
        );
    }

export default MovieCard;