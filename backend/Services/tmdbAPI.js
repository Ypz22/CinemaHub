import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Movies

export async function getTrendingMovies(page = 1) {
    try {
        const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
                page: page,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
}

export async function getTopRatedMovies(page = 1) {
    try {
        const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
                page: page,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
}

export async function getUpcomingMovies(page = 1) {
    try {
        const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
                page: page,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
}

export async function getGenreListMovies() {
    try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching genre list movies:', error);
        throw error;
    }
}

export async function getGenreMovies(genreId, page = 1) {
    try {
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
                with_genres: genreId,
                page: page,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
}

export async function getMovieDetails(movieId) {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
}

export async function getProvidersMovies(movieId) {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/watch/providers`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
}

// TVShows

export async function getTrendingTvShows(page = 1) {
    try {
        const response = await axios.get(`${BASE_URL}/trending/tv/week`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
                page: page,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching trending tv shows:', error);
        throw error;
    }
}

export async function getTopRatedTvShows(page = 1) {
    try {
        const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
                page: page,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching top-rated tv shows:', error);
        throw error;
    }
}

export async function getOnAirTvShows(page = 1) {
    try {
        const response = await axios.get(`${BASE_URL}/tv/on_the_air`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
                page: page,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching upcoming tv shows:', error);
        throw error;
    }
}

export async function getGenreListTvShows() {
    try {
        const response = await axios.get(`${BASE_URL}/genre/tv/list`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching genre list tv shows:', error);
        throw error;
    }
}

export async function getGenreTvShows(genreId, page = 1) {
    try {
        const response = await axios.get(`${BASE_URL}/discover/tv`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
                with_genres: genreId,
                page: page,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching genre tv shows:', error);
        throw error;
    }
}

export async function getTvShowsDetails(tvId) {
    try {
        const response = await axios.get(`${BASE_URL}/tv/${tvId}`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
}

export async function getProvidersTvShows(tvId) {
    try {
        const response = await axios.get(`${BASE_URL}/tv/${tvId}/watch/providers`, {
            params: {
                language: 'en-US',
                api_key: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
}