import React, { useEffect, useState } from 'react';

const MovieList = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [editingFilm, setEditingFilm] = useState(null); //state for editing
  const [form, setForm] = useState({
    name: '',
    released: '',
    genre: '',
    stars: '',
  });
  const apiUrl = import.meta.env.VITE_API_URL || '/';
  const token = localStorage.getItem('token');

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

    fetchFilms(); //call the async function
  }, [apiUrl, token]);

  const deleteFilm = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/films/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, //include the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Delete movie failed');
      }

      //remove the film from the local state
      setFilms(films.filter(film => film._id !== id));
    } catch (error) {
      setError(error.message);
      console.error('Delete error:', error);
    }
  };

  const updateFilm = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/films/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, //include the token in the Authorization header
        },
        body: JSON.stringify(form), //send the updated film data
      });

      if (!response.ok) {
        throw new Error('Update movie failed');
      }

      setFilms(films.map(film => (film._id === id ? { ...film, ...form } : film)));
      setEditingFilm(null); //close the editform
    } catch (error) {
      setError(error.message);
      console.error('Update error:', error);
    }
  };

  const handleEditClick = (film) => {
    setEditingFilm(film); //set the film being edited
    setForm({
      name: film.name || '',
      released: film.released || '',
      genre: film.genre || '',
      stars: film.stars || '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingFilm) {
      updateFilm(editingFilm._id);
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
              {film.name} - {film.released} - {film.genre} - {film.stars}
              <button onClick={() => deleteFilm(film._id)}>Delete</button>
              <button onClick={() => handleEditClick(film)}>Edit</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No films found</div>
      )}

      {editingFilm && (
        <div>
          <h2>Edit Film</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <label>Year Released:</label>
              <input type="text" name="released" value={form.released} onChange={handleChange} />
            </div>
            <div>
              <label>Genre:</label>
              <input type="text" name="genre" value={form.genre} onChange={handleChange} />
            </div>
            <div>
              <label>Star Rating:</label>
              <input type="text" name="stars" value={form.stars} onChange={handleChange} />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MovieList;