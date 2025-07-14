import React from "react";

const InfoCarrousel = ({ movie }) => {
    const star = "⭐";
    const rating = Math.round(movie.vote_average / 2);
    const stars = star.repeat(rating);
    return (
        <div className="carrousel-info">
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>📆 Release Date: {movie.release_date}</p>
            <p>Rating: {stars}</p>
        </div>
    );
}
export default InfoCarrousel; 