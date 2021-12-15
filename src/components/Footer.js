import Card from './MovieCard';

const Footer = ({movieData}) =>
{
    return(
        <footer>
            <Card movieData={movieData.movie} />
            { movieData.name
            ? <h3>{movieData.movie.title}<br/>{movieData.day.weekday} - {movieData.name}</h3>
            : <h3>{movieData.movie.title}</h3>}
        </footer>
    );
}

export default Footer;