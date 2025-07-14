import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AllMoviesTvShows = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    let type = query.get("type");
    const idGenre = query.get("idGenre");
    const typeElement = query.get("typeElement");
    const [activePage, setActivePage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [isSaved, setIsSaved] = useState([]);
    const [idUser, setIdUser] = useState(null); // 👈 Nuevo estado

    let url = "";
    switch (type) {
        case "trending":
            url = "trending";
            break;
        case "top rated":
            url = "top-rated";
            break;
        case "upcoming":
            url = "upcoming";
            break;
        case "on air":
            url = "onAir";
            break;
        default:
            url = `genre/${idGenre}`;
            break;
    }

    useEffect(() => {
        fetch(`http://localhost:3001/api/${typeElement}/${url}?page=${activePage}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error al cargar películas', error));
    }, [activePage, typeElement, url]);

    useEffect(() => {
        const fetchUserAndList = async () => {
            try {
                const response = await fetch('http://localhost:3001/auth/me', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) throw new Error('No autenticado');

                const data = await response.json();
                const idUser = data.user.id;
                setIdUser(idUser);

                const res = await fetch(`http://localhost:3001/myList/getMyMList?idUser=${idUser}&type=${typeElement}`, {
                    credentials: 'include'
                });
                const result = await res.json();
                setIsSaved(result);
            } catch (error) {
                console.error('Error get myList', error);
            }
        };

        fetchUserAndList();
    }, [typeElement]);

    const handleSave = async (idElement) => {
        if (!idUser) return;
        try {
            const saveResponse = await fetch('http://localhost:3001/myList/saveMyList', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idElement, idUser, typeElement })
            });

            if (saveResponse.ok) {
                setIsSaved(prev => [...prev, { idelement: idElement }]);
            }

        } catch (error) {
            console.error("Error en handleSave:", error.message);
        }
    };

    const handleDelete = async (idElement) => {
        if (!idUser) return;
        try {
            const deleteResponse = await fetch(`http://localhost:3001/myList/deleteMyList`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idElement, idUser, typeElement })
            });

            if (deleteResponse.ok) {
                setIsSaved(prev => prev.filter(item => item.idelement !== idElement));
            }

        } catch (error) {
            console.error("Error en handleDelete:", error.message);
        }
    };

    const handlePageChange = (page) => {
        setActivePage(page);
        document.querySelector("#header")?.scrollIntoView({ behavior: "smooth" });
        document.querySelector(".page-btn.active")?.classList.remove("active");
        document.querySelector(`.page-btn:nth-child(${page})`)?.classList.add("active");
    };

    const handleNextPage = () => {
        const nextPage = activePage < 5 ? activePage + 1 : 1;
        setActivePage(nextPage);
        document.querySelector(".page-btn.active")?.classList.remove("active");
        document.querySelector("#header")?.scrollIntoView({ behavior: "smooth" });
        document.querySelector(`.page-btn:nth-child(${nextPage})`)?.classList.add("active");
    };

    return (
        <div>
            <section className="category-header" id="header">
                <div className="container">
                    <h1>{type.toUpperCase()} {typeElement === "tv-shows" ? "TV SHOWS" : "MOVIES"}</h1>
                    <p>Embark on epic journeys and discover new worlds with our collection of films.</p>
                </div>
            </section>
            <section className="movie-grid">
                <div className="container">
                    <div className="movies">
                        {movies.map((element) => {
                            const saved = isSaved.some(saved => saved.idelement == element.id);
                            return (
                                <div className="movie-card" key={element.id}>
                                    <div className="movie-poster">
                                        <img src={`https://image.tmdb.org/t/p/w500${element.poster_path}`} alt={element.title} />
                                        <div className="movie-rating">
                                            <span>⭐️ {element.vote_average}</span>
                                        </div>
                                        <div className="movie-actions">
                                            <button
                                                onClick={() => navigate(`/details/${element.id}?type=${typeElement}`)}
                                                className="btn-info"
                                            >
                                                <i className="fas fa-info-circle"></i>
                                            </button>
                                            <button
                                                className="btn-bookmark"
                                                onClick={() => saved ? handleDelete(element.id) : handleSave(element.id)}
                                            >
                                                <i className={saved ? "fas fa-bookmark" : "far fa-bookmark"}></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="movie-info">
                                        <h3 className="movie-title">{element.title}</h3>
                                        <div className="movie-meta">
                                            <span className="movie-year">{element.release_date}</span>
                                            <span className="movie-duration">88 min</span>
                                        </div>
                                        <p className="movie-desc">{element.overview}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="pagination">
                        {[1, 2, 3, 4, 5].map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`page-btn ${page === 1 ? "active" : ""}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button onClick={handleNextPage} className="page-btn next">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AllMoviesTvShows;
