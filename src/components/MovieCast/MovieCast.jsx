import React, { useEffect, useState } from 'react'
import { fetchResultsByIdCredits } from '../../services/api';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import s from './MovieCast.module.css'
const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const abortController = new AbortController();
        const getData = async() => {
            const signal = abortController.signal;
            try{
                setLoading(true);
                const data = await fetchResultsByIdCredits(movieId, signal);
                setCast(data);
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
    
    if (!cast) {
    return <p className={s.loading}>Movie not found.</p>;
    }
    return (
        <div className={s.castContainer}>
        <h3>Cast</h3>
        {loading && <p>Loading...</p>}
        <ul className={s.castGrid}>
        {cast.map((actor) => (
            <li key={actor.id} className={s.card}>
                <img
                    src={
                    actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                    }
                    alt={actor.name}
                    className={s.avatar}
                />
                <div className={s.info}>
                    <p className={s.name}>{actor.name}</p>
                    <p className={s.character}>as {actor.character}</p>
                </div>
            </li>
        ))}
        </ul>
    </div>
    )
}

export default MovieCast
