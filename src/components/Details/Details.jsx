import React from "react";
import { useParams, useLocation } from "react-router-dom";
import InfoItem from "./InfoItem";

const Details = () => {
    const idElement = useParams().id;
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const type = query.get("type");
    const typeElement = type;

    const [details, setdetails] = React.useState([]);
    const [providers, setproviders] = React.useState([]);
    const [active, setActive] = React.useState(false);
    const [selectedKey, setSelectedKey] = React.useState(null);
    const [isSaved, setIsSaved] = React.useState(false);
    const [idUser, setIdUser] = React.useState(null);

    React.useEffect(() => {
        fetch(`http://localhost:3001/api/${type}/${idElement}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setdetails(data))
            .catch(error => console.error('Error al cargar detalles', error));
    }, []);

    React.useEffect(() => {
        fetch(`http://localhost:3001/api/${type}/providers/${idElement}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setproviders(data.results))
            .catch(error => console.error('Error al cargar proveedores', error));
    }, []);

    React.useEffect(() => {
        const fetchUserAndSavedStatus = async () => {
            try {
                const response = await fetch('http://localhost:3001/auth/me', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) throw new Error('No autenticado');

                const data = await response.json();
                const userId = data.user.id;
                if (!userId) return;

                setIdUser(userId);

                const res = await fetch(`http://localhost:3001/myList/getElementMyList?idElement=${idElement}&idUser=${userId}`, {
                    credentials: 'include'
                });

                const result = await res.json();
                setIsSaved(result ? true : false);
            } catch (error) {
                console.error('Error get myList', error);
            }
        };

        fetchUserAndSavedStatus();
    }, []);

    const handleSave = async () => {
        try {
            if (!idUser) return;

            const saveResponse = await fetch('http://localhost:3001/myList/saveMyList', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idElement,
                    idUser,
                    typeElement
                })
            });

            if (saveResponse.ok) {
                setIsSaved(true);
            }

        } catch (error) {
            console.error("Error en handleSave:", error.message);
        }
    };

    const handleDelete = async () => {
        try {
            if (!idUser) return;

            const deleteResponse = await fetch(`http://localhost:3001/myList/deleteMyList`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idElement,
                    idUser,
                    typeElement
                })
            });

            if (deleteResponse.ok) {
                setIsSaved(false);
            }

        } catch (error) {
            console.error("Error en handleDelete:", error.message);
        }
    };

    return (
        <div className="container-details">
            <div className="left-panel">
                <h1 className="detail-title">{type === "movies" ? details.title : details.original_name}</h1>
                <h2 className="original-title">{type === "movies" ? details.original_title : details.original_name}</h2>

                <div className="detail-description">
                    <p>{details.overview}</p>
                    <p className="tagline">"{details.tagline}"</p>
                </div>

                <div className="providers">
                    <span onClick={() => setActive(!active)}>WATCH PROVIDERS</span>
                </div>

                <div className={`navigation-details ${active ? "show" : ""}`}>
                    <ul>
                        {providers.US ? (
                            Object.entries(providers.US).map(([key, value]) =>
                                key === "link" ? null : (
                                    <li
                                        className="info"
                                        key={key}
                                        onClick={() => setSelectedKey(selectedKey === key ? null : key)}
                                    >
                                        {key.toUpperCase()}
                                        <ul className={`info-list ${selectedKey === key ? "show" : ""}`}>
                                            {value.map((provider) => (
                                                <li key={provider.provider_id}> ✹ {provider.provider_name}</li>
                                            ))}
                                        </ul>
                                    </li>
                                )
                            )
                        ) : (
                            <p>Providers not found</p>
                        )}
                    </ul>
                </div>
            </div>

            <div className="center-panel">
                <div className="poster-wrapper">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                        alt={details.title}
                        className="details-poster"
                    />
                </div>
            </div>

            <div className="right-panel">
                <div className="info-section">
                    <div className="info-item">
                        <h3>PREMIERE</h3>
                        <p>{type === "movies" ? details.release_date : details.first_air_date}</p>
                    </div>

                    <InfoItem name="PRODUCTION" array={details.production_companies} />
                    <InfoItem name="COUNTRY" array={details.production_countries} />
                    <InfoItem name="GENRE" array={details.genres} />

                    <div className="info-item">
                        <h3>{type === "movies" ? "RUNTIME" : "NUMBER OF SEASONS"}</h3>
                        <p>{type === "movies" ? `${details.runtime} minutes` : `${details.number_of_seasons} seasons`}</p>
                    </div>

                    <InfoItem name="LANGUAGE" array={details.spoken_languages} />

                    <div className="rating">
                        <div className="rating-score">{Math.trunc(details.vote_average * 100) / 100} / 10</div>
                        <div className="rating-votes">Based on {details.vote_count} votes</div>
                    </div>

                    <div>
                        <button
                            className="btn-bookmark-details"
                            onClick={isSaved ? handleDelete : handleSave}
                        >
                            <i className={isSaved ? "fas fa-bookmark" : "far fa-bookmark"}></i>
                            {isSaved ? "SAVED" : `SAVE ${type === "movies" ? "MOVIE" : "TV SHOW"}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
