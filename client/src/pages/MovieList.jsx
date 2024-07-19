
import React, { useEffect, useState } from 'react';

const MovieList = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || '/';
  const token = localStorage.getItem('token'); //get token from localStorage

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch(`${apiUrl}/films/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, //include the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Can't find your films");
        }

        const result = await response.json();
        setFilms(result); //set the films data
      } catch (error) {
        setError(error.message); //handle error
        console.error('Fetch error:', error);
      }
    };

    fetchFilms();
  }, [apiUrl, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const deleteFilm = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/films/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, //innclude the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Delete movie failed');
      }

      //remove the film
      setFilms(films.filter(film => film._id !== id));

    } catch (error) {
      setError(error.message);
      console.error('Delete error:', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Movie List</h1>
      {films.length > 0 ? (
        <ul>
          {films.map((film) => (
            <li key={film._id}>
              {film.name}
              {film.released}
              {film.genre}
              {film.stars}
              <button onClick={() => deleteFilm(film._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No films found</div>
      )}
    </div>
  );
};

export default MovieList;
