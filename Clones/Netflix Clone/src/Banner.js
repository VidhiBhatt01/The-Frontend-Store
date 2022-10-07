import React, { useState, useEffect } from 'react'
import './Banner.css';
import axios from './axios';
import requests from './Requests';

const Banner = () => {

  // setting up satate and fetching the data from API
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ('...') : string;
  }
    return (
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner-contents">
          <h1 className="banner-title">{movie.title}</h1>
          <div className="banner-buttons">
            <button className="banner-button">Play</button>
            <button className="banner-button"> My List</button>
          </div>
          <h2 className="banner-description">
            {truncate(movie?.overview,150)}
          </h2>
        </div>

        <div className="banner-fadeBottom" />
      </header>
    );
}

export default Banner
