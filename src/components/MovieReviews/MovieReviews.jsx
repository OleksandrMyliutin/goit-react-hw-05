import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieReviews } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import s from './MovieReviews.module.css'
const MovieReviews = () => {
    const {movieId} = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const abortController = new AbortController();
        const getData = async() => {
            const signal = abortController.signal;
            try{
                setLoading(true);
                const data = await fetchMovieReviews(movieId, signal);
                setReviews(data);
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
    
    if (!reviews) {
    return <p className={s.loading}>Movie not found.</p>;
    }
    return (
        <div className={s.castContainer}>
            <h3>Reviews</h3>
            {loading && <p>Loading...</p>}
            { reviews.length == 0 ? <p><span className={s.span}>No one left a comment</span></p> :<ul className={s.castGrid}>
            {reviews.map((author) => (
                <li key={author.id} className={s.card}>
                    <img
                        src={
                        author.profile_path
                            ? `https://image.tmdb.org/t/p/w200${author.author_details.avatar_path}`
                            : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                        }
                        alt={author.author_details.name}
                        className={s.avatar}
                    />
                    <div className={s.info}>
                        <p className={s.name}>{author.author_details.name}</p>
                        <p>Date of publication: {author.created_at}</p>
                        <p className={s.content}>Comment: {author.content}</p>

                    </div>
                </li>
            ))}
            </ul>}
        </div>
    )
}

export default MovieReviews
