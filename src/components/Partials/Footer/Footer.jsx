import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const prevLocation = useRef(location.pathname);

    useEffect(() => {
        if (location.pathname !== "/AllMoviesTvShows") {
            prevLocation.current = location.pathname;
        }
    }, [location.pathname]);

    const basePath = location.pathname === "/AllMoviesTvShows" ? prevLocation.current : location.pathname;

    const isMoviesPage = basePath === "/movies";

    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <h2>CinemaHub</h2>
                        <p>Your ultimate movie destination</p>
                    </div>

                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a onClick={() => navigate(`#logo`)}>Home</a></li>
                            <li><a onClick={() => navigate(`${basePath}#trending`)}>Trending</a></li>
                            <li><a onClick={() => navigate(`${basePath}#toprated`)}>Top Rated</a></li>
                            {isMoviesPage && <li><a onClick={() => navigate(`${basePath}#upcoming`)}>New Releases</a></li>}
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h3>Popular Categories</h3>
                        <ul>
                            {isMoviesPage ? (
                                <>
                                    <li><a onClick={() => navigate("/movies#action")}>Action</a></li>
                                    <li><a onClick={() => navigate("/movies#adventure")}>Adventure</a></li>
                                    <li><a onClick={() => navigate("/movies#comedy")}>Comedy</a></li>
                                    <li><a onClick={() => navigate("/movies#drama")}>Drama</a></li>
                                </>
                            ) : (
                                <>
                                    <li><a onClick={() => navigate("/tvShows#animation")}>Animation</a></li>
                                    <li><a onClick={() => navigate("/tvShows#comedy")}>Comedy</a></li>
                                    <li><a onClick={() => navigate("/tvShows#crime")}>Crime</a></li>
                                    <li><a onClick={() => navigate("/tvShows#documentary")}>Documentary</a></li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h3>Stay Updated</h3>
                        <p>Subscribe to our newsletter for the latest movies and updates.</p>
                        <form>
                            <input type="email" placeholder="Your email address" />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 CinemaHub. All rights reserved.</p>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://x.com/?lang=es" target="_blank"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
