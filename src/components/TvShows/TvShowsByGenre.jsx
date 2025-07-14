import React, { useState, useEffect } from 'react';
import TvShow from './TvShow';

const TvShowsByGenre = () => {
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/tv-shows/genre-list', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setGenre(data.genres))
            .catch(error => console.error('Error al cargar géneros', error));
    }, []);

    return (
        <>
            {genre.map((genre) => (
                <TvShow key={genre.id} url={`genre/${genre.id}`} titleName={genre.name} idGenre={genre.id} />
            ))}
        </>
    );
};

export default TvShowsByGenre;
