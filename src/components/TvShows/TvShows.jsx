import React from "react";
import HeroTvShows from "./HeroTvShows.jsx";
import TvShow from "./TvShow.jsx";
import TvShowsByGenre from "./TvShowsByGenre.jsx";
const TvShows = () => <div className="logo">
    <HeroTvShows />
    <TvShow url={`onAir?page=1`} titleName={"On Air"} />
    <TvShow url={`trending?page=3`} titleName={"Trending"} />
    <TvShow url={`top-rated?page=1`} titleName={"Top Rated"} />
    <TvShowsByGenre />
</div>;
export default TvShows;