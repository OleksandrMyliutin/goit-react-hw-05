import axios from 'axios';
import { ACCESSKEY } from "../accesskey/key";

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