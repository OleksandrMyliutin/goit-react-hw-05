import React, { useEffect, useState } from 'react'
import { fetchResultsTrends } from '../../services/api';
import s from './HomePage.module.css'
import Loader from '../../components/Loader/Loader';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../../components/ImageModal/ImageModal';

const HomePage = () => {
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const handleLoadMore = () =>{
        setPage(prev => prev + 1);
    };
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const openModal = (movie) => {
        setSelectedImage(movie);
        setModalIsOpen(true);
    };
    
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage(null);
    };
    useEffect(() => {
        const abortController = new AbortController();
        const getData = async() => {
            const signal = abortController.signal;
            try{
                setLoading(true);
                const data = await fetchResultsTrends(page, signal);
                setResults( prev => [...prev, ...data.results]);
                setTotalPages(data.total_pages)
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
    }, [page]);
    return (
        <div className={s.container}>
            <h2 className={s.trendsTitle}>Trends</h2>
            <div className={s.movieList}>
                {results.map((item) => (
                    <div key={item.id} className={s.movieItem} onClick={() => openModal(item)}>
                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                        { item.title.length <= 47 ? <h3>{item.title}</h3> : <h3>{item.title.slice(0, 47)+"..."}</h3>}
                    </div>
                ))}
            </div>
            <ImageModal isOpen={modalIsOpen} movie={selectedImage} onClose={closeModal} />
            {loading && <div className={s.wrapper}><Loader loading={loading}/></div>}
            {results.length > 0 && !loading && page < totalPages && <div className={s.loadMoreContainer}><LoadMoreBtn onClick={handleLoadMore}/></div>}
        </div>
    )
}

export default HomePage
