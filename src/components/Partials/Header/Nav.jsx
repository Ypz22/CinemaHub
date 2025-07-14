import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const [activeLink, setActiveLink] = useState("");
    const navigate = useNavigate();

    const handleClick = (link) => {
        setActiveLink(link);
    };

    return (
        <nav className="nav">
            <ul>
                <li>
                    <a

                        onClick={() => { handleClick("movies"); navigate("/movies") }}
                        className={activeLink === "movies" ? "activated" : ""}
                    >
                        MOVIES
                    </a>
                </li>
                <li>
                    <a
                        onClick={() => { handleClick("tvShows"); navigate('/tvShows') }}
                        className={activeLink === "tvShows" ? "activated" : ""}
                    >
                        TV SHOWS
                    </a>
                </li>
                <li>
                    <a
                        onClick={() => { handleClick("myList"); navigate('/myList') }}
                        className={activeLink === "myList" ? "activated" : ""}
                    >
                        MY LIST
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
