import axios from 'axios';
import { ACCESSKEY } from "../accesskey/key";

export const fetchResults = async (query, page, signal) => {
    const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
        headers:{
            Authorization: `Bearer ${ACCESSKEY}`
        },
        params:{
        query: query,
        page: page
        },
        signal: signal,
    })
    return response.data;
}

export const fetchResultsTrends = async ( page, signal) =>{
    const options = {
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + ACCESSKEY,
        },
        params:{
            page: page,
        },
        signal: signal,
    };
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
    return response.data;
}

export const fetchResultsById = async (movieId, signal) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESSKEY}`,
    },
    signal,
    });
    return response.data;
};

export const fetchResultsByIdCredits = async (movieId, signal) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESSKEY}`,
    },
    signal,
    });
    return response.data.cast;
};

export const fetchMovieReviews = async (movieId, signal) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESSKEY}`,
    },
    signal,
    });
    return response.data.results;
};

