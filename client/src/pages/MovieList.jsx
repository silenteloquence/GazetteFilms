import React, { useEffect, useState } from 'react';

const MovieList = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [editingFilm, setEditingFilm] = useState(null); //state for editing
  //const form for update film
  const [editForm, setEditForm] = useState({
    name: '',
    released: '',
    genre: '',
    stars: '',
  });
  //const for form for add film
  const [addForm, setAddForm] = useState({
    name: '',
    released: '',
    genre: '',
    stars: '',
  });
  
  //declare consts for apiUrl from dot env and token from local storage
  const apiUrl = import.meta.env.VITE_API_URL || '/';
  const token = localStorage.getItem('token');

  //useEffect to get user's films
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch(`${apiUrl}/films/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, //authorization requires Bearer then token
          },
        });

        if (!response.ok) {
          throw new Error("Can't find your films");
        }

        const result = await response.json();
        setFilms(result);
      } catch (error) {
        setError(error.message);
        console.error('Fetch error:', error);
      }
    };

    fetchFilms();
  }, [apiUrl, token]);

  //delete film by id, to be called by button next to any film in list
  const deleteFilm = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/films/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Delete movie failed');
      }

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
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Update movie failed');
      }

      setFilms(films.map(film => (film._id === id ? { ...film, ...editForm } : film)));
      setEditingFilm(null); //remove film set for edit once edited
    } catch (error) {
      setError(error.message);
      console.error('Update error:', error);
    }
  };

  const handleEditClick = (film) => {
    setEditingFilm(film);
    setEditForm({
      name: film.name || '',
      released: film.released || '',
      genre: film.genre || '',
      stars: film.stars || '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editingFilm) {
      updateFilm(editingFilm._id);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm({ ...addForm, [name]: value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username');
    const filmData = { ...addForm, user: username };

    try {
      const response = await fetch(`${apiUrl}/films/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(filmData),
      });

      if (!response.ok) {
        throw new Error('Add movie failed');
      }

      //add the new film to local state
      const newFilm = await response.json();
      setFilms([...films, newFilm]);
      setAddForm({
        name: '',
        released: '',
        genre: '',
        stars: '',
      });
    } catch (error) {
      setError(error.message);
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
        <div>No films found</div> //display if films has no items
      )}

      {editingFilm && ( //form for editing film to only show when button is clicked until it is saved
        <div>
          <h2>Edit Film</h2>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={editForm.name} onChange={handleEditChange} />
            </div>
            <div>
              <label>Year Released:</label>
              <input type="text" name="released" value={editForm.released} onChange={handleEditChange} />
            </div>
            <div>
              <label>Genre:</label>
              <input type="text" name="genre" value={editForm.genre} onChange={handleEditChange} />
            </div>
            <div>
              <label>Star Rating:</label>
              <input type="text" name="stars" value={editForm.stars} onChange={handleEditChange} />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      )}

      <div>
        <h2>Add Movie</h2>
        <form onSubmit={handleAddSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="name"
              value={addForm.name}
              onChange={handleAddChange}
            />
          </div>
          <div>
            <label>Year Released:</label>
            <input
              type="text"
              name="released"
              value={addForm.released}
              onChange={handleAddChange}
            />
          </div>
          <div>
            <label>Genre:</label>
            <input
              type="text"
              name="genre"
              value={addForm.genre}
              onChange={handleAddChange}
            />
          </div>
          <div>
            <label>Rating (out of 5 stars):</label>
            <input
              type="text"
              name="stars"
              value={addForm.stars}
              onChange={handleAddChange}
            />
          </div>
          <button type="submit">Add</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default MovieList;