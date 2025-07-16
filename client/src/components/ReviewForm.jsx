import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ userId, productId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews', {
        userId,
        productId,
        rating,
        comment
      });
      alert("Avis ajouté !");
      setComment('');
      setRating(5);
    } catch (err) {
      alert("Erreur lors de l'ajout !");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <label>Note : </label>
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>{n} étoile{n > 1 && 's'}</option>
        ))}
      </select>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Laissez un commentaire..."
        className="block w-full mt-2 p-2 border rounded"
      />

      <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Envoyer</button>
    </form>
  );
};

export default ReviewForm;
