import React from 'react';
import { useLocation } from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) {
    return <div className="text-black">No movie details available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 font-sans">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-center text-blue-400">{movie.title}</h1>
      <div className="flex flex-col items-center">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750/1f2937/d1d5db?text=No+Image'}
          alt={movie.title}
          className="w-full max-w-md rounded-lg mb-4 object-cover object-center shadow-lg"
        />
        <p className="text-lg text-gray-300">{movie.overview}</p>
        <p className="text-sm text-gray-400 mt-4">Release Date: {movie.release_date}</p>
      </div>
    </div>
  );
};

export default Details;
