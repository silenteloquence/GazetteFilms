import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const [form, setForm] = useState({
    name: '',
    released: '',
    genre: '',
    stars: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const filmData = { ...form, user: username };

    try {
      const response = await fetch(`${apiUrl}/films/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(filmData),
      });

       if (!response.ok) {
        throw new Error('Add movie failed');
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Add Movie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Year Released:</label>
          <input
            type="text"
            name="released"
            value={form.released}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={form.genre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rating (out of 5 stars):</label>
          <input
            type="text"
            name="stars"
            value={form.stars}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddMovie;