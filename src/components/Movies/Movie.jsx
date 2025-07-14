import React from "react";
import { useState } from "react";
import HeaderCards from "../HeaderCards";
import Cards from "../Cards";

const Movie = (props) => {
    const [movies, setMovies] = useState([]);
    React.useEffect(() => {
        fetch(`http://localhost:3001/api/movies/${props.url}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error al cargar películas', error));
    }, []);

    return (
        <div className="trendingMovies">
            <div className="container">
                <HeaderCards title={`${props.titleName}`} idGenre={props.idGenre} />
                <div className="cards-container">
                    {movies.length > 0 ? (
                        <Cards contents={movies} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Movie;
