import express from 'express';
import { getTrendingMovies, getTopRatedMovies, getUpcomingMovies, getGenreMovies, getGenreListMovies, getMovieDetails, getProvidersMovies } from './../Services/tmdbAPI.js';

const router = express.Router();


router.get('/trending', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const movies = await getTrendingMovies(page);
        res.json(movies);
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/top-rated', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const movies = await getTopRatedMovies(page);
        res.json(movies);
    } catch (error) {
        console.error('Error fetching top-rated movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

router.get('/upcoming', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const movies = await getUpcomingMovies(page);
        res.json(movies);
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

router.get('/genre-list', async (req, res) => {
    try {
        const movies = await getGenreListMovies();
        res.json(movies);
    } catch (error) {
        console.error('Error fetching genre-list movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

router.get('/genre/:id', async (req, res) => {
    try {
        const genreId = req.params.id;
        const page = req.query.page || 1;
        const movies = await getGenreMovies(genreId, page);
        res.json(movies);
    } catch (error) {
        console.error('Error fetching genre movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const movies = await getMovieDetails(id);
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);


router.get('/providers/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const providers = await getProvidersMovies(id);
        res.json(providers);
    } catch (error) {
        console.error('Error fetching search movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);



export default router;