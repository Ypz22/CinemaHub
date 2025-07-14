import React from "react";
import { useState } from "react";
import HeaderCards from "../HeaderCards";
import Cards from "../Cards";

const TvShow = (props) => {
    const [tvShows, setTvShows] = useState([]);
    React.useEffect(() => {
        fetch(`http://localhost:3001/api/tv-shows/${props.url}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setTvShows(data))
            .catch(error => console.error('Error al cargar tv shows', error));
    }, []);
    return (
        <div className="trendingtvShows">
            <div className="container">
                <HeaderCards title={`${props.titleName}`} idGenre={props.idGenre} />
                <div className="cards-container">
                    {tvShows.length > 0 ? (
                        <Cards contents={tvShows} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div >
    )
}

export default TvShow;
