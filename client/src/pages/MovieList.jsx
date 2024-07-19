import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/api/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
      });
  }, []);

  const deleteMovie = (id) => {
    axios.delete(`/api/movies/${id}`)
      .then(() => {
        setMovies(movies.filter(movie => movie._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the movie!', error);
      });
  };

  return (
    <div>
      <h1>Movie List</h1>
      <Link to="/add">Add Movie</Link>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            {movie.title} - {movie.rating}
            <Link to={`/update/${movie._id}`}>Edit</Link>
            <button onClick={() => deleteMovie(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;