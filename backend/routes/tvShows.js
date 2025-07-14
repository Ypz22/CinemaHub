import express from 'express';
import { getTrendingTvShows, getTopRatedTvShows, getOnAirTvShows, getGenreListTvShows, getGenreTvShows, getTvShowsDetails, getProvidersTvShows } from './../Services/tmdbAPI.js';

const router = express.Router();


router.get('/trending', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const tvShows = await getTrendingTvShows(page);
        res.json(tvShows);
    } catch (error) {
        console.error('Error fetching trending tv shows:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/top-rated', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const tvShows = await getTopRatedTvShows(page);
        res.json(tvShows);
    } catch (error) {
        console.error('Error fetching top-rated tv shows:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

router.get('/onAir', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const tvShows = await getOnAirTvShows(page);
        res.json(tvShows);
    } catch (error) {
        console.error('Error fetching upcoming tv shows:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

router.get('/genre-list', async (req, res) => {
    try {
        const tvShows = await getGenreListTvShows();
        res.json(tvShows);
    } catch (error) {
        console.error('Error fetching genre-list tv shows:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

router.get('/genre/:id', async (req, res) => {
    try {
        const genreId = req.params.id;
        const page = req.query.page || 1;
        const tvShows = await getGenreTvShows(genreId, page);
        res.json(tvShows);
    } catch (error) {
        console.error('Error fetching genre tv shows:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const tvShows = await getTvShowsDetails(id);
        res.json(tvShows);
    } catch (error) {
        console.error('Error fetching tvShows:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);


router.get('/providers/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const providers = await getProvidersTvShows(id);
        res.json(providers);
    } catch (error) {
        console.error('Error fetching search tv Shows:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

export default router;