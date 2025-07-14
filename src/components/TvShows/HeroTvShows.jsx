import React from "react";
import { useState, useEffect } from 'react';
import Carrousel from "../Carrousel/Carrousel.jsx";

const HeroTvShows = () => {
    const [tvShows, setTvShows] = useState([]);
    React.useEffect(() => {
        fetch('http://localhost:3001/api/tv-shows/trending?page=1', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setTvShows(data))
            .catch(error => console.error('Error al cargar los tv shows', error));
    }, []);
    return (
        <div className="trending-movies">
            <div className="carrousel-container">
                {tvShows.length > 0 ? (
                    <Carrousel images={tvShows.map(tvShow => ({ title: tvShow.original_name, description: tvShow.overview, url: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`, release_date: tvShow.release_date, vote_average: tvShow.vote_average, type: "tv-shows", id: tvShow.id }))} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
export default HeroTvShows;