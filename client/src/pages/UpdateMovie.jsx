import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // useHistory 대신 useNavigate 사용

const UpdateMovie = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const { id } = useParams();
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  useEffect(() => {
    axios.get(`/api/movies/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setRating(response.data.rating);
      })
      .catch(error => {
        console.error('There was an error fetching the movie!', error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/api/movies/${id}`, { title, rating })
      .then(() => {
        navigate('/'); // history.push 대신 navigate 사용
      })
      .catch(error => {
        console.error('There was an error updating the movie!', error);
      });
  };

  return (
    <div>
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Rating:</label>
          <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;