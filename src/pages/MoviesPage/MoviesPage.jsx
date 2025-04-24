import React, { useEffect, useRef, useState } from 'react';
import { fetchResults } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import MovieList from '../../components/MovieList/MovieList';
import {  useSearchParams } from 'react-router-dom';
import s from './MoviesPage.module.css';


const MoviesPage = () => {
const [results, setResults] = useState([]);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);
const [loading, setLoading] = useState(false);
const galleryRef = useRef(null);
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('query') || '';



const handleChangeQuery = (newQuery) => {
    setSearchParams({ query: newQuery });
    setResults([]);
    setPage(1);
};


const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    setTimeout(() => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 300);
};

useEffect(() => {
    if (!query) return;

    const controller = new AbortController();
    const getData = async () => {
    try {
        setLoading(true);
        const data = await fetchResults(query, page, controller.signal);
        setResults((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
    } catch (error) {
        if (error.name !== 'CanceledError') console.error(error);
    } finally {
        setLoading(false);
    }
    };

    getData();
    return () => controller.abort();
}, [query, page]);

return (
    <div className={s.container}>
        
        <h2 className={s.trendsTitle}>Movies</h2>
        <SearchBar handleChangeQuery={handleChangeQuery} />
        {!loading && results.length === 0 && query && 
        (<div className={s.noResults}><ErrorMessage query={query} /></div>)}
        <ul className={s.gallery} ref={galleryRef}>
            <MovieList results={results} />
        </ul>
        {loading && (
            <div className={s.loaderWrapper}>
            <Loader loading={loading} />
            </div>
        )}
        {results.length > 0 && page < totalPages && (
            <div className={s.loadMoreContainer}>
            <LoadMoreBtn   onClick={handleLoadMore} />
            </div>
        )}
    </div>
    );
};
export default MoviesPage;
