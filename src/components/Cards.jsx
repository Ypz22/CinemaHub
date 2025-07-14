import React, { use, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Cards = (props) => {
    const [hoveredId, setHoveredId] = useState(null);
    const { contents } = props;
    const navigate = useNavigate();

    const location = useLocation();

    const handleClick = (content) => {
        const type = location.pathname === "/movies" ? "movies" : "tv-shows";
        navigate(`/details/${content.id}?type=${type}`);
    }

    return (
        contents.map((content) => (
            <div

                className="card"
                key={content.id}
                onMouseOver={() => setHoveredId(content.id)}
                onMouseOut={() => setHoveredId(null)}
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${content.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                onClick={() => {
                    handleClick(content);
                }
                }
            >
                {hoveredId === content.id && (
                    <h3 className="name">{content.title ? content.title : content.name}</h3>
                )}
            </div>
        ))
    );
}

export default Cards;
