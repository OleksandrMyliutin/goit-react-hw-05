import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import { fetchResultsById } from '../../services/api';
import TrailerModal from '../../components/TrailerModal/TrailerModal';
import { fetchMovieTrailer } from '../../services/api';
import s from './MovieDetailsPage.module.css'
import Loader from '../../components/Loader/Loader';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const goBackRef = useRef(location.state ?? '/movies');

    const [trailerKey, setTrailerKey] = useState(null);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const openTrailer = () => {
        if (trailerKey) {
            setIsTrailerOpen(true);
        } else {
            console.warn('No trailer available');
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        const getData = async() => {
            const signal = abortController.signal;
            try{
                setLoading(true);
                const data = await fetchResultsById(movieId, signal);
                setMovie(data);

                const key = await fetchMovieTrailer(movieId, signal);
                setTrailerKey(key);
            }
            catch (error) {
                console.log(error.message)
            }
            finally {
                setLoading(false);
            }
        }
        getData();
        return () => {
            abortController.abort();
        };
    }, [movieId]);



    if (loading) {
        return (
            <div className={s.wrapper}>
                <Loader loading={loading} />
            </div>
        );
    }
    
    if (!movie) {
    return <p className={s.loading}>Movie not found.</p>;
    }

    return (
        <div className={s.container}>
            <Link className={s.goBack} to={goBackRef.current}>Go back</Link>
            {loading && <div className={s.wrapper}><Loader loading={loading}/></div>}
            <h2>{movie.title}</h2>
            <div className={s.flexContainer}>
                <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={s.poster}
                />
                <div className={s.flexItems}>
                    <p>{movie.overview}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> {movie.vote_average}</p>
                </div>
            </div>
            <div className={s.loadMoreContainer}>
                <button onClick={openTrailer} className={s.trailerBtn}>
                🎬 Watch Trailer
                </button>
            </div>
            <TrailerModal isOpen={isTrailerOpen} trailerKey={trailerKey} onClose={() => setIsTrailerOpen(false)} />
                <nav className={s.navLinks}>
                <NavLink to="cast">Cast</NavLink>
                <NavLink to="reviews">Reviews</NavLink>
                </nav>
                <Outlet />
        </div>
    );
}

export default MovieDetailsPage
