import React, { useEffect, useState } from 'react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetch(`${apiUrl}/movies`)
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, [apiUrl]);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to GazetteFilms</p>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title} - {movie.rating}/10</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;