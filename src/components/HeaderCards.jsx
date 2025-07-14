import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderCards = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <div className="header-trending" id={`${props.title.toLowerCase().replace(/\s+/g, '')}`}>
            <h2 className="title">{props.title} {location.pathname === "/movies" ? "Movies" : "Tv Shows"}</h2>
            <div className="buttons">
                <button onClick={() => {
                    navigate(`/AllMoviesTvShows?type=${props.title.toLowerCase()}&idGenre=${props.idGenre}&typeElement=${location.pathname === "/movies" ? "movies" : "tv-shows"}`);
                }} className="btn btn-primary">Load More</button>
            </div>
        </div>
    );
}

export default HeaderCards;