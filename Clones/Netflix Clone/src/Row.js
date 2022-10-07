
import React, { useState, useEffect } from 'react'
import axios from "./axios";
import "./Row.css"

const Row = ({ title, fetchUrl, isLargeRow = false }) => {

    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();

    }, [fetchUrl])

    console.log(movies);

    return (
      <div className="row">
        <h1>{title}</h1>

        <div className="row-posters">
          {movies.map((movie) =>
          ((isLargeRow && movie.backdrop_path) || // if the row is Large and image path is present
            (!isLargeRow && movie.backdrop_path)) && ( // if the row is not large and the image is not broken
            <img
              className={`row-poster ${isLargeRow && "row-posterLarge"}`}
              key={movie.id}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path} `}
              alt={movie.name}
            />
          ))}
        </div>
      </div>
    );
}

export default Row
