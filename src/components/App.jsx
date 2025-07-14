import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Partials/Layout.jsx';
import Movies from "./Movies/Movies.jsx";
import TvShows from "./TvShows/TvShows.jsx";
import Details from "./Details/Details.jsx";
import AllMoviesTvShows from "./AllMoviesTvShows/AllMoviesTvShows.jsx";
import Login from "./Login/Login.jsx";
import MyList from "./MyList/MyList.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Movies />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvShows" element={<TvShows />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/AllMoviesTvShows" element={<AllMoviesTvShows />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myList" element={<MyList />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;