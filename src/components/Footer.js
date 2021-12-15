import Card from './MovieCard';

const Footer = ({movieData}) =>
{
    console.log(movieData);
    return(
        <footer>
            <Card movieData={movieData.movie} />
            { movieData.name ? <h3>{movieData.movie.title}<br/>{movieData.day.weekday} - {movieData.name}</h3> : ''}
        </footer>
    );
}

export default Footer;