import React from "react";
import { useState, useEffect } from 'react';
import Carrousel from "../Carrousel/Carrousel.jsx";

const HeroMovies = () => {
    const [movies, setMovies] = useState([]);
    React.useEffect(() => {
        fetch('http://localhost:3001/api/movies/trending?page=1', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error al cargar películas', error));
    }, []);

    return (
        <div className="trending-movies">
            <div className="carrousel-container">
                {movies.length > 0 ? (
                    <Carrousel images={movies.map(movie => ({ title: movie.original_title, description: movie.overview, url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, release_date: movie.release_date, vote_average: movie.vote_average, type: "movies", id: movie.id }))} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
export default HeroMovies;