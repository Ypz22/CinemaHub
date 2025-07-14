import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyList = () => {
    const navigate = useNavigate();
    const [idUser, setIdUser] = useState(null);
    const [elementIds, setElementIds] = useState([]);
    const [allElements, setAllElements] = useState([]);
    const [isSelected, setIsSelected] = useState("movies");

    useEffect(() => {
        const fetchUserAndList = async () => {
            try {
                const res = await fetch('http://localhost:3001/auth/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!res.ok) throw new Error('No autenticado');
                const data = await res.json();
                const userId = data.user.id;
                setIdUser(userId);

                const listRes = await fetch(`http://localhost:3001/myList/getAllMyMList?idUser=${userId}`, {
                    credentials: 'include',
                });
                const result = await listRes.json();
                setElementIds(result);
            } catch (error) {
                console.error('Error al obtener usuario o lista:', error);
            }
        };

        fetchUserAndList();
    }, []);

    useEffect(() => {
        const fetchElementDetails = async () => {
            try {
                const data = await Promise.all(
                    elementIds
                        .filter(item => item.type === isSelected)
                        .map(async (item) => {
                            const res = await fetch(`http://localhost:3001/api/${isSelected}/${item.idelement}`, {
                                credentials: 'include',
                            });
                            return res.json();
                        })
                );
                setAllElements(data);
            } catch (error) {
                console.error('Error al cargar elementos:', error);
            }
        };

        if (elementIds.length > 0) {
            fetchElementDetails();
        } else {
            setAllElements([]);
        }
    }, [elementIds, isSelected]);

    const handleDelete = async (idElement) => {
        try {
            if (!idUser) return;

            const deleteResponse = await fetch(`http://localhost:3001/myList/deleteMyList`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idElement, idUser, typeElement: isSelected }),
            });

            if (deleteResponse.ok) {
                const refreshed = await fetch(`http://localhost:3001/myList/getAllMyMList?idUser=${idUser}`, {
                    credentials: 'include'
                });
                const result = await refreshed.json();
                setElementIds(result);
            }

        } catch (error) {
            console.error("Error en handleDelete:", error.message);
        }
    };

    return (
        <div>
            <section className="category-header">
                <div className="container">
                    <h1>Your Saved Favorites
                    </h1>
                    <p>Keep track of the movies and shows you love. Watch them anytime, all in one place.
                    </p>
                </div>
            </section>

            <div className="container-buttons-mylist">
                <div className="toggle-container">
                    <input
                        type="radio"
                        id="movies"
                        name="content-type"
                        checked={isSelected === "movies"}
                        onChange={() => setIsSelected("movies")}
                    />
                    <label htmlFor="movies">Movies</label>

                    <input
                        type="radio"
                        id="tvshows"
                        name="content-type"
                        checked={isSelected === "tv-shows"}
                        onChange={() => setIsSelected("tv-shows")}
                    />
                    <label htmlFor="tvshows">TV Shows</label>

                    <div className="slider"></div>
                </div>
            </div>

            {!idUser && (<div className="no-login-mylist-container">
                <h2>You are not logged in, please log in to see your saved content.</h2>
            </div>)}

            <section className="movie-grid">
                <div className="container">
                    <div className="movies">
                        {allElements.filter(Boolean).map((movie) => {
                            const saved = elementIds.some(saved => saved.idelement == movie.id);
                            return (
                                <div className="movie-card" key={movie.id}>
                                    <div className="movie-poster">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title || movie.name}
                                        />
                                        <div className="movie-rating">
                                            <span>{movie.vote_average}</span>
                                        </div>
                                        <div className="movie-actions">
                                            <button
                                                onClick={() => navigate(`/details/${movie.id}?type=${isSelected}`)}
                                                className="btn-info"
                                            >
                                                <i className="fas fa-info-circle"></i>
                                            </button>
                                            <button
                                                className="btn-bookmark"
                                                onClick={() => handleDelete(movie.id)}
                                            >
                                                <i className={saved ? "fas fa-bookmark" : "far fa-bookmark"}></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="movie-info">
                                        <h3 className="movie-title">{movie.title || movie.name}</h3>
                                        <div className="movie-meta">
                                            <span className="movie-year">{movie.release_date || movie.first_air_date}</span>
                                            <span className="movie-duration">88 min</span>
                                        </div>
                                        <p className="movie-desc">{movie.overview}</p>
                                    </div>
                                </div>
                            )
                        })}
                        {allElements.length === 0 && (
                            <p>No elements in your list.</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyList;
