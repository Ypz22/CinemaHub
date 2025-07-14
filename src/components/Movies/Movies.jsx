import React from "react";
import HeroMovies from "./HeroMovies.jsx";
import Movie from "./Movie.jsx";
import MoviesByGenre from "./MoviesByGenre.jsx";

const Movies = () =>
    <div className="logo">
        <HeroMovies />
        <Movie url={`trending?page=3`} titleName={"Trending"} />
        <Movie url={`top-rated?page=1`} titleName={"Top Rated"} />
        <Movie url={`upcoming?page=1`} titleName={"Upcoming"} />
        <MoviesByGenre />
    </div>;
export default Movies;