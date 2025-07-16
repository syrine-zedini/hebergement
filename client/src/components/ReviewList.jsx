import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`/api/reviews/${productId}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [productId]);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Avis des utilisateurs</h3>
      {reviews.map((r, i) => (
        <div key={i} className="mb-2 border p-2 rounded shadow-sm">
          <p className="text-yellow-600">⭐ {r.rating}</p>
          <p>{r.comment}</p>
          <p className="text-sm text-gray-500">par {r.userId?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
