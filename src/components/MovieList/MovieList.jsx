import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ results }) => {
  const location = useLocation();
  return results.map(movie => (
    <li key={movie.id} className={s.card}>
      <Link state={location} to={`/movies/${movie.id}`} className={s.link}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : 'https://www.movienewz.com/img/films/poster-holder.jpg'
          }
          alt={movie.title}
          className={s.image}
        />
        { movie.title.length <= 47 ? <h3>{movie.title}</h3> : <h3>{movie.title.slice(0, 47)+"..."}</h3>}
      </Link>
    </li>
  ));
};

export default MovieList;
